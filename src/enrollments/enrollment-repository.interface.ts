import { CreateEnrollmentDTO } from "./dtos/create_enrollment.dto";
import { UpdateEnrollmentDTO } from "./dtos/update_enrollment.dto";
import { IEnrollmentPayload } from "./interface/enrollments-payload-interface";
import { IEnrollment } from "./schema/enrollments";

interface IEnrollmentRepository {
  getAllUserEnrollments(userId: string): Promise<IEnrollment[]>;

  updateEnrollmentStatus(
    userId: string,
    dto: UpdateEnrollmentDTO
  ): Promise<IEnrollment | null>;

  getSingleEnrollmentByCourseAndUserId(
    userId: string,
    courseId: string
  ): Promise<IEnrollment | null>;
  createEnrollment(
    dto: CreateEnrollmentDTO,
    userId: string
  ): Promise<IEnrollment | null>;

  getSingleEnrollment(id: string): Promise<IEnrollment | null>;
  deleteEnrollment(id: string): Promise<boolean>;
  getAllEnrollments(userId: string): Promise<IEnrollmentPayload[]>;
}

export default IEnrollmentRepository;
