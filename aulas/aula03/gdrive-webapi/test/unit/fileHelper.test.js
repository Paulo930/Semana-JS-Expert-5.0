import { describe, test, expect, jest } from '@jest/globals';
import fs from 'fs';
import FileHelper from '../../src/fileHelper.js';
import Routes from '../../src/routes.js';

describe('#FileHelper', () => {
  describe('#getFilesStatus', () => {
    test('it should return files statuses in correct format', async () => {
      const statMock = {
        dev: 685611337,
        mode: 33206,
        nlink: 1,
        uid: 0,
        gid: 0,
        rdev: 0,
        blksize: 4096,
        ino: 1688849861408149,
        size: 714,
        blocks: 1,
        atimeMs: 1649873546827.6926,
        mtimeMs: 1649862609277.7434,
        ctimeMs: 1649862609277.7434,
        birthtimeMs: 1649873546800.7014,
        atime: '2022-04-13T18:12:26.828Z',
        mtime: '2022-04-13T15:10:09.278Z',
        ctime: '2022-04-13T15:10:09.278Z',
        birthtime: '2022-04-13T18:12:26.801Z',
      };

      const mockUser = 'erickwendel';
      process.env.USER = mockUser;
      const filename = 'file.png';

      jest
        .spyOn(fs.promises, fs.promises.readdir.name)
        .mockResolvedValue([filename]);

      jest
        .spyOn(fs.promises, fs.promises.stat.name)
        .mockResolvedValue(statMock);

      const result = await FileHelper.getFilesStatus('/tmp');

      const expectedResult = [
        {
          size: '714 B',
          lastModified: statMock.birthtime,
          owner: mockUser,
          file: filename,
        },
      ];

      expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`);
      expect(result).toMatchObject(expectedResult);
    });
  });
});
