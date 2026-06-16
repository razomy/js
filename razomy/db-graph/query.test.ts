import {addEdgeMut, addVertexMut, createGraphStorage} from "./storage";
import {filterHasTag, startQuery, stepIn, stepOut, yieldVertices} from "./query";

describe('InMemoryGraphStorage Functional Tests', () => {
  let db: ReturnType<typeof createGraphStorage>;

  beforeEach(() => {
    // 1. Create base
    db = createGraphStorage();

    // 2. Fill with data
    addVertexMut(db, {id: '1', tags: ['User'], value: {name: 'Alice', age: 25}});
    addVertexMut(db, {id: '2', tags: ['User'], value: {name: 'Bob', age: 30}});
    addVertexMut(db, {id: '3', tags: ['User'], value: {name: 'Charlie', age: 35}});
    addVertexMut(db, {id: '101', tags: ['Post'], value: {title: 'Hello Graph DB!'}});

    // Who knows whom (Friends)
    addEdgeMut(db, {from: '1', to: '2', edgeKey: 'KNOWS', value: {weight: 0.8}});
    addEdgeMut(db, {from: '2', to: '3', edgeKey: 'KNOWS', value: {weight: 0.9}});

    // Who liked what
    addEdgeMut(db, {from: '2', to: '101', edgeKey: 'LIKES', value: {date: '2023-10-01'}});
    addEdgeMut(db, {from: '3', to: '101', edgeKey: 'LIKES', value: {date: '2023-10-02'}});
  });

  test('Query 1: Alice\'s friends (1 step OUT)', () => {
    // Start from Alice ('1') -> OUT 'KNOWS'
    let q = startQuery(db, '1');
    q = stepOut(q, 'KNOWS');

    const result = yieldVertices(q);

    expect(result).toHaveLength(1);
    expect(result[0].value.name).toBe('Bob');
  });

  test('Query 2: Friends of friends of Alice (2 steps OUT)', () => {
    // Start from Alice ('1') -> OUT 'KNOWS' -> OUT 'KNOWS'
    let q = startQuery(db, '1');
    q = stepOut(q, 'KNOWS');
    q = stepOut(q, 'KNOWS');

    const result = yieldVertices(q);

    expect(result).toHaveLength(1);
    expect(result[0].value.name).toBe('Charlie');
  });

  test('Query 3: Who liked post 101? (Reverse search / IN)', () => {
    // Start from Post ('101') -> IN 'LIKES' -> filter by Tag 'User'
    let q = startQuery(db, '101');
    q = stepIn(q, 'LIKES');
    q = filterHasTag(q, 'User');

    const result = yieldVertices(q);
    const names = result.map(v => v.value.name);

    expect(result).toHaveLength(2);
    expect(names).toContain('Bob');
    expect(names).toContain('Charlie');
  });

  test('Edge Case: Searching for non-existent relations should return empty array', () => {
    let q = startQuery(db, '1');
    q = stepOut(q, 'NON_EXISTENT_EDGE');

    const result = yieldVertices(q);
    expect(result).toEqual([]);
  });

  test('Edge Case: Filtering by non-existent tag should return empty array', () => {
    let q = startQuery(db, '1');
    q = filterHasTag(q, 'Admin'); // Alice is not an Admin

    const result = yieldVertices(q);
    expect(result).toEqual([]);
  });
});
