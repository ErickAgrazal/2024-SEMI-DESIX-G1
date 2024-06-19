import bcrypt from 'bcrypt';

const transactions = []
const users = [];

const getType = (type) => type === 'user' ? users : transactions; 

const generateRandomToken = () => {
  const randomToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  return randomToken;
}

const add = (type, data) => {
  const db = getType(type);
  db.push({ ...data, id: db.length });
}

const get = (type, { options } = {}) => {
  const db= getType(type);
  return db.filter((item) => {
    for (const key in options) {
      if (item[key] !== options[key]) {
        return false
      }
    }
    return true
  });
}

const remove = (index) => {
  db.splice(index, 1)
}

const update = (type, index, data) => {
  const db = getType(type);
  db[index] = { ...db[index], ...data };
}

const find = (index) => {
  const db = getType(type);
  return db[index];
}

const db = {
  userModel: {
    add: (options) => {
      if (!options.username || !options.password || !options.name) {
        console.log('Missing parameters: ', { options });
        return { status: false, message: 'Invalid data'};
      }
      if (get('user', { username: options.username }).length > 0) {
        console.log('User already exists: ', { options });
        return { status: false, message: 'Invalid data' };
      }
      options.password = bcrypt.hashSync(options.password, 10);
      add('user', options);
      return { status: true, message: 'Registration successful' };
    },
    get: (options) => get('user', options),
    remove: (options) => remove('user', options),
    update: (options) => update('user', options),
    find: (options) => find('user', options),
    login: (options) => {
      if (!options.username || !options.password) {
        console.log('Missing parameters: ', { options });
        return { status: false, message: 'Either username or password are incorrect.' };
      }
      const user = get('user', { username: options.username })[0];
      if (!user) {
        console.log('User not found: ', { options });
        return { status: false, message: 'Either username or password are incorrect.' };
      }
      update('user', user.id, { token: generateRandomToken() });
      return {
        status: bcrypt.compareSync(options.password, user.password),
        message: 'Login successful',
        user: {
          ...user,
          token: generateRandomToken(),
        },
      }
    }
  },
  transactionsModel: {
    add: (options) => add('transactions', options),
    get: (options) => get('transactions', options),
    remove: (options) => remove('transactions', options),
    update: (options) => update('transactions', options),
    find: (options) => find('transactions', options),
  }
};

export default db;