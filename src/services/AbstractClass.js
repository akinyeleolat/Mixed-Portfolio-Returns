import Error from '../utils/ErrorUtils';

/**
 * abstract type services
 * @class
 */
class AbstractClass {
  /**
   * constructor
   * @param {*} model
   */
  constructor(model) {
    if (this.constructor === AbstractClass) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.DataModel = model;
  }

  /**
   * get all object
   * @returns {object} all data
   */
  async getAll() {
    const dataList = await this.DataModel.findAll();

    if (!dataList || !dataList.length) {
      throw new Error('Data Error', 404, 'the required list does not exist');
    }
    return {
      success: true,
      data: dataList
    };
  }

  /**
   *  create user type
   * @param {*} data data
   * @returns {object} usertype
   */
  async create(data) {
    const { name } = data;
    if (name !== undefined) {
      const dataValue = await this.DataModel.findOne({
        where: { name },
      });
      if (dataValue) {
        throw new Error('Data Error', 409, `${this.DataModel} does  exist`);
      }
    }

    const newDataValue = await this.DataModel.create(data);
    return {
      success: true,
      data: newDataValue
    };
  }

  /**
   *  create or find usertypedata by id, typename
   * @param {*} data
   * @return {object} usertype
   */
  async find(data) {
    const { id, name } = data;
    let dataValue;

    if (id) {
      dataValue = await this.DataModel.findByPk(id);
      return {
        success: true,
        data: dataValue
      };
    }


    dataValue = await this.DataModel.findOne({
      where: { name },
    });

    if (!dataValue) {
      throw new Error('Data Error', 404, 'record does not exist');
    }
    return {
      success: true,
      data: dataValue
    };
  }


  /**
   *  create or find usertypedata by id, typename
   * @param {*} data
   * @return {object} usertype
   */
  async findBy(data) {
    // eslint-disable-next-line prefer-const
    let { limit, page, ...condition } = data;
    if (limit === undefined) {
      limit = 10;
    }
    if (page === undefined) {
      page = 1;
    }

    const offset = 0 + (page - 1) * limit;

    const dataValue = await this.DataModel.findAndCountAll({
      offset,
      limit,
      order: [
        ['createdAt', 'DESC']
      ],
      where: condition
    });


    const { count: totalItems, rows } = dataValue;

    if (!rows.length) {
      throw new Error('Data Error', 404, 'record does not exist');
    }
    const totalPages = Math.ceil(totalItems / limit);
    const pageSize = Number(limit);
    const currentPage = Number(page);

    return {
      success: true,
      data: rows,
      pageSize,
      currentPage,
      totalPages
    };
  }

  /**
  * update user type
  * @param {*} data
  * @return {object} usertype
  */
  async update(data) {
    const { id } = data;
    const dataValue = await this.DataModel.findByPk(id);

    if (!dataValue) {
      throw new Error('Data Error', 404, 'record does not exist');
    }

    const updatedData = await this.DataModel.update(
      { ...data },
      { where: { id } }
    );
    if (updatedData) {
      const updatedDataValue = await this.DataModel.findByPk(id);
      return {
        success: true,
        data: updatedDataValue
      };
    }
  }
}

export default AbstractClass;
