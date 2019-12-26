import Profile from '../../models/Profile';

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
}

export default ProfileController;
