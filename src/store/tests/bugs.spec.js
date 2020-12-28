import { addBug, resolveBug, loadBugs, getUnresolvedBugs } from "../bugs";
import configureStore from "../configureStore";
import axios from "axios";
import MockAdpter from "axios-mock-adapter";

// Social Test
describe("bugsSlice", () => {

	let store;
	let fakedAxios;

	beforeEach(() => {
		store = configureStore();
		fakedAxios = new MockAdpter(axios);
	});

	const bugsSlice = () => store.getState().entities.bugs;

	const getBugs = () => ([
		{id: 1, resolved: true},
		{id: 2},
		{id: 3},
	]);

	const createState = () => ({
		entities: {
			bugs: {
				list: [],
			}
		}
	});

	it("should add the bug to the store if it's saved to the server", async () => {

		const bug = { description: 'a' };
		const savedBug = { ...bug, id: 1 }
		fakedAxios.onPost("/bugs").reply(200, savedBug);

		await store.dispatch(addBug(bug));

		expect(bugsSlice().list).toContainEqual(savedBug);

	});

	it("should not add the bug to the store if it's not saved to the server", async () => {

		const bug = { description: 'a' };
		fakedAxios.onPost("/bugs").reply(500);

		await store.dispatch(addBug(bug));

		expect(bugsSlice().list).toHaveLength(0);

	});

	describe("Selectors", () => {
		it("getUnresolvedBugsr", () => {

			const state = createState();
			state.entities.bugs.list = getBugs();

			const unresolvedBugs = getUnresolvedBugs(state);
			
			expect(unresolvedBugs).toHaveLength(2);
	
		});
	});

	it("should resolve the bug in the store if it's resolved in the server", async () => {

		const bugId = 1;
		const resolvedBug = { id: bugId, resolved: true}
		fakedAxios.onPatch("/bugs/" + bugId).reply(200, resolvedBug);
		fakedAxios.onPost("/bugs").reply(200, { id: bugId});

		await store.dispatch(addBug({}));
		await store.dispatch(resolveBug(bugId));

		expect(bugsSlice().list[0].resolved).toBe(true);

	});

	it("should not resolve the bug in the store if it's not resolved in the server", async () => {

		const bugId = 1;
		fakedAxios.onPatch("/bugs/" + bugId).reply(500);
		fakedAxios.onPost("/bugs").reply(200, { id: bugId});

		await store.dispatch(addBug({}));
		await store.dispatch(resolveBug(bugId));

		expect(bugsSlice().list[0].resolved).not.toBe(true);

	});

	describe("loading bugs", () => {
		describe("if the bugs exist in the cache", () => {
			it("they should not be fetched from the server", async () => {
				fakedAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

				await store.dispatch(loadBugs());
				await store.dispatch(loadBugs());

				expect(fakedAxios.history.get.length).toBe(1);
			});

		});
		describe("if the bugs don't exist in the cache", () => {
			it("they should be fetched from the server and saved on the store", async () => {
				fakedAxios.onGet("/bugs").reply(200, [{id: 1}]);

				await store.dispatch(loadBugs());

				expect(bugsSlice().list).toHaveLength(1);
			});

			describe("loading indicator", () => {
				it("should be true while fetching the bugs", () => {

					fakedAxios.onGet("/bugs").reply(() => {
						expect(bugsSlice().loading).toBe(true);
						return [200, [{id: 1}]];
					})

					store.dispatch(loadBugs());

				});
				it("should be false after bugs are fetched", async () => {

					fakedAxios.onGet("/bugs").reply(200, [{id: 1}]);

					await store.dispatch(loadBugs());

					expect(bugsSlice().loading).toBe(false);
				});
				it("should be false if the server returns an error", async () => {
					
					fakedAxios.onGet("/bugs").reply(500);

					await store.dispatch(loadBugs());

					console.log(bugsSlice());
					expect(bugsSlice().loading).toBe(false);
				});
			});
		});
	});

});
