import { Test, TestingModule } from '@nestjs/testing';
import { UsersActivityController } from './users-activity.controller';

describe('UsersActivityController', () => {
  let controller: UsersActivityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersActivityController],
    }).compile();

    controller = module.get<UsersActivityController>(UsersActivityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
