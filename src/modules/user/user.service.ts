import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { Users } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepty: Repository<Users>,
  ) {}

  // 分页查列表
  async queryUserList(param) {
    const { pageSize = 3, pageIndex = 0, keyWords = '' } = param;
    const [pageData, totalCount] = await this.userRepty
      .createQueryBuilder()
      .where({
        id: Like(`%${keyWords}%`),
      })
      .skip(pageIndex)
      .take(pageSize)
      .getManyAndCount();
    return {
      pageData,
      totalCount,
    };
  }
  // id查详情
  async queryUserById(id: string) {
    return this.userRepty.findOne(id);
  }

  /**
   * 新增或者修改
   */
  async addOrupdate(user) {
    const { id } = user;
    let ret = false;
    const thisOne = await this.userRepty.findOne({ id });
    if (thisOne) {
      Object.assign(thisOne, user);
      user = thisOne;
    }
    const tempRet = await this.userRepty.save(user);
    tempRet && (ret = true);
    return ret;
  }

  /**
   * 根据id物理删除记录（单条删除或者多条）
   * @param id 记录的id，例如："5f8d60b51e504746dc132450" or [1,2,3]
   *
   */
  async delete(id: string | string[]) {
    const ret = await this.userRepty.delete(id);
    return { affected: ret.affected };
  }
}
