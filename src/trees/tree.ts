import _ from 'lodash';

export interface TreeNode<T extends TreeNode = any> {
  parent: T | null;
  children: T[];
  value: unknown;
}

export function isPropertyExists(obj, keys: string[]) {
  const isKeyExists = _.some(keys, (key) => _.has(obj, key));
  if (isKeyExists) {
    return true;
  }
}

export function getPathsWithAnyKey(obj: object, keys: string[]) {
  if (isPropertyExists(obj, keys)) {
    return [''];
  }

  if (_.isObject(obj)) {
    let result: string[] = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const children = getPathsWithAnyKey(value, keys);
        const withKey = children.map(ckey => `${key}:` + ckey);
        result = result.concat(withKey);
      }
    }
    return result;
  }

  if (_.isArray(obj)) {
    let result: string[] = [];
    _.forEach(obj as object[], (value, key, index) => {
      const children = getPathsWithAnyKey(value, keys);
      const withKey = _.map(children, ckey => `${key}:${index}` + ckey);
      result = result.concat(withKey);
    });
    return result;
  }

  return [];
}

export function getPathsWithAnyKeyAll(obj: object, keys: string[]) {
  let res: string[] = [];
  if (isPropertyExists(obj, keys)) {
    res.push('');
  }

  if (_.isObject(obj)) {
    let result: string[] = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const children = getPathsWithAnyKeyAll(value, keys);
        const withKey = children.map(ckey => `${key}:` + ckey);
        result = result.concat(withKey);
      }
    }
    res = res.concat(result);

  }

  if (_.isArray(obj)) {
    let result: string[] = [];
    _.forEach(obj as object[], (value, key, index) => {
      const children = getPathsWithAnyKeyAll(value, keys);
      const withKey = _.map(children, ckey => `${key}:${index}` + ckey);
      result = result.concat(withKey);
    });
    res = res.concat(result);
  }

  return res;
}

export function getObjectByPath(obj, path: string) {
  if (path === '') {
    return obj;
  }

  const closingBracketIndex = path.indexOf(':');
  const slug = path.substring(0, closingBracketIndex);

  let childNode = _.find(obj, (value, key) => {
    return key === slug;
  });

  if (!childNode) {
    throw new Error('Node not found');
  }

  const remainingString = path.substring(closingBracketIndex + 1);

  return getObjectByPath(childNode, remainingString);
}

export function getObjectsInPath(obj, path: string) {
  if (path === '') {
    return [];
  }

  const closingBracketIndex = path.indexOf(':');
  const slug = path.substring(0, closingBracketIndex);

  let childNode = _.find(obj, (value, key) => {
    return key === slug;
  });

  if (!childNode) {
    throw new Error('Node not found');
  }

  const remainingString = path.substring(closingBracketIndex + 1);

  return [childNode, ...getObjectsInPath(childNode, remainingString)];
}

export function getNodeByPath<T extends TreeNode>(node: T, path: string): T {
  if (path === '') {
    return node;
  }

  const closingBracketIndex = path.indexOf(':');
  const slug = path.substring(0, closingBracketIndex);

  const childNode = node.children.find(child => child.value === slug);

  if (!childNode) {
    throw new Error('Node not found');
  }

  const remainingString = path.substring(closingBracketIndex + 1);

  return getNodeByPath(childNode, remainingString);
}


export function findNodeByPath(node, path, match) {
  if (path.length === 0 || !match(node, path[0])) {
    return null;
  }

  if (path.length === 1) {
    return node;
  }

  for (const childNode of node.children) {
    const foundNode = findNodeByPath(childNode, path.slice(1), match);

    if (foundNode) {
      return foundNode;
    }
  }

  return null;
}


export function findAllNodeByPath<T extends TreeNode>(node: T, path, match) {
  if (path.length === 0) {
    return [];
  }

  const [currentValue, ...remainingPath] = path;
  let matchingNodes: T[] = [];

  if (match(node, currentValue)) {
    if (remainingPath.length === 0) {
      matchingNodes.push(node);
    } else {
      for (const childNode of node.children) {
        const foundNodes = findAllNodeByPath(childNode, remainingPath, match);
        matchingNodes.push(...foundNodes);
      }
    }
  }

  return matchingNodes;
}


export function FirstParentDeep<T extends TreeNode>(node: T, cb: (node: T) => boolean) {
  if (cb(node)) {
    return node;
  }

  if (node.parent == null) {
    return null;
  }

  return FirstParentDeep(node.parent, cb);
}

export function LastChildDeep<T extends TreeNode>(node: T) {
  const lastChild = node.children?.at(-1);
  if (!lastChild) {
    return node;
  }

  return LastChildDeep(lastChild);
}

export function ForeachDeep<T extends TreeNode>(node: T, cb: (node: T) => void) {
  cb(node);
  for (const n of node.children) {
    ForeachDeep<T>(n as T, cb);
  }
}

export function ReverseForeachDeep<T extends TreeNode>(node: T, cb: (node: T) => void) {
  for (const n of node.children) {
    ReverseForeachDeep(n as T, cb);
  }

  cb(node);
}

export function FilterDeep<T extends TreeNode>(node: T, cb: (node: T) => boolean, skip = false): T[] {
  let res: T[] = [];

  if (cb(node)) {
    res.push(node);
    if (skip) {
      return res;
    }
  }
  for (const n of node.children) {
    res = res.concat(FilterDeep(n, cb, skip));
  }

  return res;
}
