# Storagedotjs
A simple, lightweight JavaScript api for accessing Local Storage.

## Installation

### npm
```bash
npm install storagedotjs
```

### pnpm
```bash
pnpm install storagedotjs
```

### yarn
```bash
yarn install storagedotjs
```

## Usage
### Storing data
```typescript
import { setItem } from 'storagedotjs';

setItem('key', 'value');
```

#### Data expiry
Data stored in localstorage can last forever unless cleared by the user.
To set preferred expiry date or time, pass a third argument.

##### Using strings
```typescript
// 30 seconds
setItem('key', 'value', '30s');
// 15 minutes
setItem('key', 'value', '15min');
// 6 hours
setItem('key', 'value', '15h');
// 5 days
setItem('key', 'value', '5d');
// 2 months
setItem('key', 'value', '2m');
// 7 years
setItem('key', 'value', '7y');
```

##### Using a date object
```typescript
// 15 minutes
const date = new Date();
date.setDate(date.getDate() + 7)
setItem('key', 'value', date);
```

##### Using a timestamp
```typescript
// Sunday, February 26, 2023 12:41:41 AM GMT+01:00
setItem('key', 'value', 1677368501000);
```

#### Objects and arrays are automatically stringified into json

```typescript
// Object
const user = { firstName: 'Antonio', lastName: 'Okoro' };
setItem('my-user', user);

// Array
const pets = ['dog', 'cat', 'bunny', 'goldfish'];
setItem('my-pets', pets);
```


### Getting data from storage
```typescript
import { getItem } from 'storagedotjs';

const user = getItem('my-user');
```

#### Using type annotations for return values
```typescript
import { getItem } from 'storagedotjs';

interface User {
  firstName: string;
  lastName: string;
}

const user = getItem<User>('my-user');
```

### Checking if data exists in the storage
```typescript
import { hasItem } from 'storagedotjs';

if (hasItem('key')) {
  // code...
}
```

### Removing data
```typescript
import { removeItem } from 'storagedotjs';

const logout = () => removeItem('key');
```
