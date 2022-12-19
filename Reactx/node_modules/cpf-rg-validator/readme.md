### Instalation

`yarn add cpf-rg-validator`

### Usage
Accepts masked string (xxx.xxx.xxx-xx), unmasked (xxxxxxxxxxx) or plain number

```javascript
const Validator = require('cpf-rg-validator');

Validator.cpf('725.701.128-10'); // true
Validator.cpf('111.111.222-10'); // false

Validator.rg('91122534-1'); // true
Validator.rg('91122534'); // false
```