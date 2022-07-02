import { Segmented } from "antd";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import allActions from "../../store/actions";
import questionStyle from "../../styles/modules/componentStyles/Questions.module.css";
import axiosFetch from "../../axiosFetch";

const SegmentedSections = () => {
    const [smallScreenData, setSmallScreenData] = useState({});

    const { tests, questions } = useSelector((state) => state);
    const { selectedSectionId, selectedSectionNo } = useSelector(
        (state) => state.custom
    );

    const dispatch = useDispatch();

    const router = useRouter();
    const { id, testId } = router.query;
    const path = router.pathname;

    useEffect(() => {
        const x = tests[testId]?.sectionData?.reduce((acc, sect) => {
            return {
                ...acc,
                [sect.subject]: {
                    sectionId: sect.sectionId,
                    sectionNo: sect.sectionNo,
                },
            };
        }, {});
        setSmallScreenData(x);
    }, [tests, testId]);

    const onSectionChange = async (value) => {
        const data = smallScreenData[value];
        if (data.sectionId !== selectedSectionId) {
            dispatch(allActions.customActions.loading(true));
            const list = Object.values(questions);
            await axiosFetch.patch(
                `/api/tests/${testId}/sections/${selectedSectionId}`,
                { questions: list }
            );
            console.log("hiii");
            dispatch(
                allActions.customActions.selectedSectionId(data.sectionId)
            );
            dispatch(
                allActions.customActions.selectedSectionNo(data.sectionNo)
            );
            dispatch(allActions.questionActions.emptyQuestions());
            dispatch(allActions.customActions.selectedQuestion(1));
        }
    };

    const onSectionExamChange = async (value) => {
        const data = smallScreenData[value];
        console.log(data);

        if (data.sectionId !== selectedSectionId) {
            dispatch(allActions.customActions.loading(true));
            dispatch(
                allActions.examActions.onSectionChange(
                    id,
                    testId,
                    data.sectionId,
                    data.sectionNo
                )
            );
        }
    };

    return (
        <div className={questionStyle["segmented-section"]}>
            <Segmented
                options={smallScreenData && Object.keys(smallScreenData)}
                value={
                    smallScreenData &&
                    Object.keys(smallScreenData)[selectedSectionNo - 1]
                }
                onChange={
                    path && path.includes("tests")
                        ? onSectionChange
                        : onSectionExamChange
                }
            />
        </div>
    );
};

export default SegmentedSections;
