import { Button, Tooltip } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import { CloseCircleFilled } from "@ant-design/icons";
import allActions from "../../../store/actions";
import ModalCreateTest from "../ModalCreate";
import { DELETE_TEST } from "../../../store/types";

const DeleteTestForm = () => {
    const { tests } = useSelector((state) => state);

    const dispatch = useDispatch();

    const router = useRouter();
    const { id } = router.query;

    let test;
    if (id !== undefined) {
        test = tests[id];
    }

    const showPopConfirm = () => {
        dispatch(allActions.customActions.visibleDeleteTestYes());
    };

    const onSubmit = async () => {
        const res = await axios.delete(`/api/prepare/tests/${id}`);
        dispatch({ type: DELETE_TEST, payload: id });
        dispatch(allActions.customActions.visibleDeleteTestNo());
        console.log(res.data);
        router.push("/tests");
    };

    const onHandleCancel = () => {
        console.log("Clicked cancel button");
        dispatch(allActions.customActions.visibleDeleteTestNo());
    };

    return (
        <>
            <Tooltip title="Delete Test" placement="topLeft" color="red">
                <CloseCircleFilled
                    onClick={showPopConfirm}
                    // style={{ fontSize: 20, color: "#939090" }}
                    className="hover-icon-delete test-submit-delete"
                />
            </Tooltip>
            <ModalCreateTest
                style={{ top: 20 }}
                onOk={onSubmit}
                title="Delete Test"
                handleCancel={onHandleCancel}
                path="deleteTest"
            >
                <p>Warning! You sure u want to delete this test</p>
                <p>{test.testTitle}</p>
            </ModalCreateTest>
        </>
    );
};

export default DeleteTestForm;
