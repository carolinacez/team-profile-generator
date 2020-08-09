const Manager = require('../lib/Manager.js');
const Employee = require('../lib/Emplotee.js');

test('gets manager role', () =>{
    const manager = new Manager('Manager');
    expect(manager.getName()).toEqual(expect.stringContaining(manager.name.toString()));
});