export default function isProperUser(user: Object): boolean {
  return (
    'username' in user &&
    typeof user.username === 'string' &&
    'age' in user &&
    typeof user.age === 'number' &&
    'hobbies' in user &&
    Array.isArray(user.hobbies) &&
    user.hobbies.reduce((acc, el) => {
      if (typeof el !== 'string') {
        acc = false;
      }
      return acc;
    }, true)
  );
}
