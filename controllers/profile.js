import Profile from '../models/Profile';
import httpError from '../helpers/errorsHandler/httpError';

/**
 * @exports
 * @class
 */
class ProfileController {
  /**
   *
   * @param {Object} req Requests from client
   * @param {Object} res - Response from db
   * @returns {Object} Response
   */
  async createOrUpdateProfile(req, res) {
    const {
      company, location, bio, cardNumber, expiryDate, cvv
    } = req.body;
    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.company = company;
    profileFields.location = location;
    profileFields.bio = bio;
    profileFields.paymentInfo = {};
    profileFields.paymentInfo.cardNumber = cardNumber;
    profileFields.paymentInfo.expiryDate = expiryDate;
    profileFields.paymentInfo.cvv = cvv;

    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        {
          user: req.user.id
        },
        { $set: profileFields },
        { new: true }
      );
      return res.status(200).json({ status: 200, profile });
    }
    profile = new Profile(profileFields);
    await profile.save();
    return res.status(201).json({ status: 201, profile });
  }

  /**
 *
 * @param {Object} req Request from client
 * @param {Object} res Response to the client
 * @returns {Object} Response
 */
  async currentUserProfile(req, res) {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      throw new httpError(400, 'There is no profile for this user');
    }
    return res.status(200).json({ status: 200, profile });
  }
}

export default ProfileController;
