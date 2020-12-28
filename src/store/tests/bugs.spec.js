import { addBug, resolveBug, getUnresolvedBugs } from "../bugs";
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
			state.entities.bugs.list = [
				{id: 1, resolved: true},
				{id: 2},
				{id: 3},
			]

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
})
