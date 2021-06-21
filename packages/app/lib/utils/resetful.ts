export const splitPath = (prefix: string, path: string) => {
  const regex = new RegExp(
      '^/' + prefix + '/?([^/]+)?/?([^/]+)?/?([^/]+)?/?([^/]+)?$',
    ),
    match = path.match(regex),
    rest_params = [];

  if (match) {
    for (let i = 1; i < match.length; i++) {
      if (typeof match[i] !== 'undefined') {
        rest_params.push(match[i]);
      }
    }
  }

  return rest_params;
};
