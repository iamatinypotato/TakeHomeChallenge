const assert = require('assert');
const fileManager = require('../lib/file_manager.js')();

describe('File Importer', function() {
  describe('Read', function() {
    it('It should error when the file doesn\'t exist', function() {
      assert.rejects(fileManager.read('./data/customers1.txt', 'utf8'),
          {
            name: 'Error',
            message: 'Error reading file ./data/customers1.txt',
          });
    });

    it('File exists so should import.', function() {
      return fileManager.read('./data/customers.txt', 'utf8');
    });
  });

  describe('Parse', function() {
    it('Should error because the text is empty.', function() {
      assert.rejects(fileManager.parse('{asd}'),
          {
            name: 'Error',
            message: 'Error parsing JSON txt file at line 0',
          });
    });

    it('Should error because there\'s no customers found.', function() {
      assert.rejects(fileManager.parse(''),
          {
            name: 'Error',
            message: 'Error no customers present in txt file.',
          });
    });

    it('Should pass as it\'s valid JSON.', function() {
      return fileManager.parse('{"latitude": "53", ' +
          '"user_id": 13, "name": "Olive Ahearn", "longitude": "-7"}');
    });

    it('Should raise validation error as latitude is "dfd"', function() {
      assert.rejects(fileManager.parse('{"latitude": "dfd", ' +
          '"user_id": 13, "name": "Olive Ahearn", "longitude": "-7"}'),
      {
        name: 'Error',
        message: 'InvalidArgumentException "latitude" must be a number',
      });
    });

    it('Should raise validation error as longitude is "sdf"', function() {
      assert.rejects(fileManager.parse('{"latitude": "23", ' +
          '"user_id": 13, "name": "Olive Ahearn", "longitude": "sdf"}'),
      {
        name: 'Error',
        message: 'InvalidArgumentException "longitude" must be a number',
      });
    });

    it('Should raise validation error as user_id is "sdf"', function() {
      assert.rejects(fileManager.parse('{"latitude": "23", ' +
          '"user_id": "sdf", "name": "Olive Ahearn", "longitude": "34"}'),
      {
        name: 'Error',
        message: 'InvalidArgumentException "user_id" must be a number',
      });
    });

    it('Should raise validation error as user_id is missing', function() {
      assert.rejects(fileManager.parse('{"latitude": "23", ' +
          '"name": "Olive Ahearn", "longitude": "10"}'),
      {
        name: 'Error',
        message: 'InvalidArgumentException "user_id" is required',
      });
    });

    it('Should raise validation error as latitude is missing', function() {
      assert.rejects(fileManager.parse('{"user_id": 12, ' +
          '"name": "Olive Ahearn", "longitude": "10"}'),
      {
        name: 'Error',
        message: 'InvalidArgumentException "latitude" is required',
      });
    });

    it('Should raise validation error as longitude is missing', function() {
      assert.rejects(fileManager.parse('{"user_id": 12, ' +
          '"latitude": "23", "name": "Olive Ahearn"}'),
      {
        name: 'Error',
        message: 'InvalidArgumentException "longitude" is required',
      });
    });

    it('Should raise validation error as name is missing', function() {
      assert.rejects(fileManager.parse('{"latitude": "53", ' +
          '"user_id": 13, "longitude": "-7"}'),
      {
        name: 'Error',
        message: 'InvalidArgumentException "name" is required',
      });
    });

    it('Should pass as it\'s handles floats for latitude.', function() {
      return fileManager.parse('{"latitude": 53, ' +
          '"user_id": 13, "name": "Olive Ahearn", "longitude": "-7"}');
    });

    it('Should pass as it\'s handles floats for longitude.', function() {
      return fileManager.parse('{"latitude": 53, ' +
          '"user_id": 13, "name": "Olive Ahearn", "longitude": -7}');
    });
  });

  describe('Write', function() {
    it('Should write array successfully to output.txt', function() {
      assert.doesNotReject(fileManager.write('output.txt', ['Hello World!']));
    });

    it('Should write string successfully to output.txt', function() {
      assert.doesNotReject(fileManager.write('output.txt', 'Hello World!'));
    });

    it('Should write number successfully to output.txt', function() {
      assert.doesNotReject(fileManager.write('output.txt', 234));
    });
  });
});
