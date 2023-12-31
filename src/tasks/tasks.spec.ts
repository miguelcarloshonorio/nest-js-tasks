import { Test, TestingModule } from '@nestjs/testing';
import { Task } from './tasks';

describe('Tasks', () => {
  let provider: Task;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Task],
    }).compile();

    provider = module.get<Task>(Task);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
