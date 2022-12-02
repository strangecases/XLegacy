import { Segmented } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import allActions from "../../store/actions";
import questionStyle from "../../styles/modules/componentStyles/Questions.module.css";
import axiosFetch from "../../axiosFetch";
import { stringOverflow } from "../../utils";

const SegmentedSections = () => {
    const [smallScreenData, setSmallScreenData] = useState({});

    const { tests, questions, custom } = useSelector((state) => state);
    const { selectedSectionId, selectedSectionNo } = custom;

    const dispatch = useDispatch();

    const router = useRouter();
    const { id, testId } = router.query;
    const path = router.pathname;

    useEffect(() => {
        /* sectionData-- */
        const x = tests[testId]?.sections?.reduce((acc, sect) => {
            return {
                ...acc,
                [sect.subject]: {
                    sectionId: sect._id,
                    sectionNo: sect.sectionNo,
                },
            };
        }, {});
        setSmallScreenData(x);
    }, [tests, testId]);

    const onSectionChange = async (value) => {
        try {
            const data = smallScreenData[value];
            if (data.sectionId !== selectedSectionId) {
                dispatch(allActions.loadingActions.questionsLoading(true));
                const list = Object.values(questions);
                await axiosFetch.patch(
                    `/api/tests/${testId}/sections/${selectedSectionId}`,
                    { questions: list }
                );
                // console.log("hiii");
                dispatch(
                    allActions.customActions.selectedSectionId(data.sectionId)
                );
                dispatch(
                    allActions.customActions.selectedSectionNo(data.sectionNo)
                );
                dispatch(allActions.questionActions.emptyQuestions());
                dispatch(allActions.customActions.selectedQuestion(1));
                dispatch(allActions.customActions.saveSection(true));
            }
        } catch (err) {
            dispatch(allActions.loadingActions.questionsLoading(false));

            // console.log(err);
            toast.error(err.response.data, {
                autoClose: 2200,
                hideProgressBar: true,
            });
        }
    };

    const onSectionExamChange = async (value) => {
        const data = smallScreenData[value];

        if (data.sectionId !== selectedSectionId) {
            dispatch(allActions.loadingActions.questionsLoading(true));
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

    // console.log(
    //     Object.keys(smallScreenData).map((sectionString) => ({
    //         label: stringOverflow(sectionString, 7),
    //         value: sectionString,
    //     }))
    // );

    return (
        <div className={questionStyle["segmented-section"]}>
            <Segmented
                options={
                    smallScreenData &&
                    Object.keys(smallScreenData).map((sectionString) => ({
                        label: stringOverflow(sectionString, 7),
                        value: sectionString,
                    }))
                }
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
