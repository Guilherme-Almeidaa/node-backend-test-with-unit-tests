const user = require('../services/userService');
const statusMessages = require('../utilities/listStatusMessages');

const returnStatusCodeError = (result, res) => {
  const { statusCode, errorMessage } = result;
  res.status(statusCode);
  return res.json(errorMessage);
};

const getAll = async (_req, res) => {
  try {
    const result = await user.getAll();
    res.status(statusMessages.success);
    return res.json(result);
  } catch (error) {
    res.status(statusMessages.internalError);
    return res.json({
      error: {
        message: 'Internal error',
      },
    });
  }
};

const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await user.findById(id);
    if (result.errorMessage) return returnStatusCodeError(result, res);
    res.status(statusMessages.success);
    return res.json(result);
  } catch (error) {
    res.status(statusMessages.internalError);
    return res.json({
      error: {
        message: 'Internal error',
      },
    });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await user.deleteById(id);
    if (result.errorMessage) return returnStatusCodeError(result, res);
    return res.status(statusMessages.success).end();
  } catch (error) {
    res.status(statusMessages.internalError);
    return res.json({
      error: {
        message: 'Internal error',
      },
    });
  }
};

const findByNickName = async (req, res) => {
  try {
    const { q } = req.query;
    const result = await user.findByNickName(q);
    if (result.errorMessage) return returnStatusCodeError(result, res);
    res.status(statusMessages.success);
    return res.json(result);
  } catch (error) {
    res.status(statusMessages.internalError);
    return res.json({
      error: {
        message: 'Internal error',
      },
    });
  }
};

const updateNickName = async (req, res) => {
  try {
    const { nickname } = req.body;
    const { id } = req.params;
    const result = await user.updateNickName(nickname, id);
    if (result.errorMessage) return returnStatusCodeError(result, res);
    res.status(statusMessages.update);
    return res.json(result);
  } catch (error) {
    res.status(statusMessages.internalError);
    return res.json({
      error: {
        message: 'Internal error',
      },
    });
  }
};

const updateLastNameAndAddress = async (req, res) => {
  try {
    const { lastname, address } = req.body;
    const { id } = req.params;
    const result = await user.updateLastNameAndAddress(lastname, address, id);
    if (result.errorMessage) return returnStatusCodeError(result, res);
    res.status(statusMessages.update);
    return res.json(result);
  } catch (error) {
    res.status(statusMessages.internalError);
    return res.json({
      error: {
        message: 'Internal error',
      },
    });
  }
};

const findByNameOrLastName = async (req, res) => {
  try {
    const { q } = req.query;
    const result = await user.findByNameOrLastName(q);
    if (result.errorMessage) return returnStatusCodeError(result, res);
    res.status(statusMessages.success);
    return res.json(result);
  } catch (error) {
    res.status(statusMessages.internalError);
    return res.json({
      error: {
        message: 'Internal error',
      },
    });
  }
};

const createUser = async (req, res) => {
  try {
    const result = await user.createUser(req.body);
    res.status(statusMessages.update);
    return res.json(result);
  } catch (error) {
    res.status(statusMessages.internalError);
    return res.json({
      error: {
        message: 'Internal error',
      },
    });
  }
};

module.exports = {
  createUser,
  findByNickName,
  findByNameOrLastName,
  updateLastNameAndAddress,
  findById,
  updateNickName,
  deleteById,
  getAll,
};
