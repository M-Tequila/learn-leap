import Enrollment, { IEnrollment } from "./schema/enrollments";

export default class EnrollmentRepository {
  async createEnrollment(
    courseId: string,
    userId: string
  ): Promise<IEnrollment | null> {
    const data = new Enrollment({
      course: courseId,
      user: userId,
    });
    const response = await data.save();
    return response.toJSON();
  }
  getAllUserEnrollments = async (userId: string): Promise<IEnrollment[]> => {
    const response = await Enrollment.find({ user: userId }).populate("course");
    return response;
  };

  getSingleEnrollment = async (id: string): Promise<IEnrollment | null> => {
    const enrollment = await Enrollment.findById(id).populate("user");
    if (!enrollment) return null;
    else return enrollment;
  };

  deleteEnrollment = async (id: string, userId: string): Promise<boolean> => {
    const result = await Enrollment.deleteOne({ _id: id, user: userId });
    if (result.deletedCount === 1) return true;
    else return false;
  };

  getAllEnrollments = async (userId: string): Promise<IEnrollment[]> => {
    const enrollments = await Enrollment.find({ user: userId })
      .populate("course", {
        // populate: { path: "instructor" },
        
      })
      .exec();
    // .populate("instructor");
    return Object.values(enrollments);
  };

  checkIfEnrollmentExists = async (
    userId: string,
    courseId: string
  ): Promise<IEnrollment | null> => {
    const enrollment = await Enrollment.findOne({
      user: userId,
      course: courseId,
    }).exec();
    if (!enrollment) return null;
    else return enrollment;
  };
}
