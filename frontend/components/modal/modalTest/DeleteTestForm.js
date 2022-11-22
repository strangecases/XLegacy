import { Tooltip } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { CloseCircleFilled } from "@ant-design/icons";
import allActions from "../../../store/actions";
import ModalCreateTest from "../ModalCreate";

const DeleteTestForm = ({ type = "" }) => {
    const { tests } = useSelector((state) => state);

    const dispatch = useDispatch();

    const router = useRouter();
    const { id, testId } = router.query;

    let test;
    if (testId !== undefined) {
        test = tests[testId];
    }

    const showPopConfirm = () => {
        dispatch(allActions.modalActions.visibleDeleteTestYes());
    };

    const onSubmit = async () => {
        dispatch(allActions.testActions.deleteTest(id, testId));
    };

    const onOtherTestSubmit = () => {
        dispatch(
            allActions.schoolActions.editSchool({
                id,
                formValues: {
                    classNo: "otherTests",
                    testId,
                    type: "delete",
                },
                editType: "otherTests",
            })
        );
        dispatch(allActions.modalActions.visibleDeleteTestNo());
        // dispatch(allActions.customActions.selectedClass(""));
    };

    const onHandleCancel = () => {
        // console.log("Clicked cancel button");
        dispatch(allActions.modalActions.visibleDeleteTestNo());
    };

    return (
        <>
            <Tooltip
                title="Delete Test"
                placement="right"
                color="#ec5e5e"
                overlayClassName="tooltip-mobile-display-none"
            >
                <CloseCircleFilled
                    onClick={showPopConfirm}
                    // style={{ fontSize: 20, color: "#939090" }}
                    className="test-delete test-submit-big"
                />
            </Tooltip>
            <ModalCreateTest
                onOk={type !== "otherTests" ? onSubmit : onOtherTestSubmit}
                title="Delete Test"
                handleCancel={onHandleCancel}
                path="deleteTest"
            >
                {type !== "otherTests" ? (
                    <p>
                        Warning! You sure u want to delete this test and results
                        associated to it.
                    </p>
                ) : (
                    <p>
                        This test is from other school and your students results
                        will be deleted
                    </p>
                )}
                <p>{test.testTitle}</p>
            </ModalCreateTest>
        </>
    );
};

export default DeleteTestForm;
