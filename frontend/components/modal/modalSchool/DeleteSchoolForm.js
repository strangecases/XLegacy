import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import allActions from "../../../store/actions";
import ModalCreateTest from "../ModalCreate";

const DeleteSchoolForm = () => {
    const dispatch = useDispatch();

    const router = useRouter();
    const { id } = router.query;

    const onSubmit = async () => {
        dispatch(allActions.schoolActions.deleteSchool(id));
    };

    const onHandleCancel = () => {
        // console.log("Clicked cancel button");
        dispatch(allActions.modalActions.visibleDeleteSchoolNo());
    };

    return (
        <ModalCreateTest
            onOk={onSubmit}
            title="Delete School"
            handleCancel={onHandleCancel}
            path="deleteSchool"
        >
            <p>Warning! You sure u want to delete this school</p>
            <p>
                This will delete all the tests and students results related to
                those tests.
            </p>
        </ModalCreateTest>
    );
};

export default DeleteSchoolForm;
