import { ForbiddenRequestError, NotFoundRequestError } from "../errors";
import HttpException from "../errors/base-http-exception";

import EnrollmentRepository from "./enrollment.repository";

export default class EnrollmentsService {
  private enrollmentsRepository = new EnrollmentRepository();

  createEnrollment = async (courseId: string, userId: string) => {
    console.log(`CourseID ${courseId}`);
    const enrollmentExists =
      await this.enrollmentsRepository.checkIfEnrollmentExists(
        userId,
        courseId
      );
    if (enrollmentExists) {
      throw new ForbiddenRequestError(
        "A user can not enroll for a course twice."
      );
    }
    const response = await this.enrollmentsRepository.createEnrollment(
      courseId,
      userId
    );
    if (!response) {
      throw new HttpException(
        500,
        "failed to create enrollment for this course."
      );
    }
    return response;
  };

  cancelEnrollment = async (enrollmentId: string, userId: string) => {
    const enrollment = await this.enrollmentsRepository.getSingleEnrollment(
      enrollmentId
    );
    if (!enrollment) {
      throw new NotFoundRequestError("Enrollment not found.");
    }
    console.log(userId);
    console.log(enrollment.user);
    // if (enrollment.user._id !== userId) {
    //   throw new NotFoundRequestError("User did not enroll for this course");
    // }
    const result = await this.enrollmentsRepository.deleteEnrollment(
      enrollmentId,
      userId
    );
    if (!result) {
      throw new HttpException(500, "failed to delete enrollment.");
    }
    return "successfully deleted enrollment.";
  };

  getAllEnrollments = async (userId: string) => {
    const result = await this.enrollmentsRepository.getAllEnrollments(userId);
    return result;
  };
}
