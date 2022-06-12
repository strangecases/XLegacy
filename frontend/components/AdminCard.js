import Link from "next/link";
import { Card } from "antd";
import authStyles from "../styles/modules/Auth.module.css";

const AdminCard = () => {
    return (
        <>
            <p className={authStyles["bolding-text"]}>
                The purpous of this website is to conduct tests for your
                students.
            </p>
            <p>
                Lets dive in and understand how to create an online equivalence
                of your school and eventually create tests for your students to
                attempt.
            </p>
            <Card
                className={`${authStyles["dark-blue-tint"]} exam-result-inner-card inner-card-padding-small `}
            >
                <ul className={authStyles["padding-to-left"]}>
                    <li>
                        Go{" "}
                        <Link href="/schools/new">
                            <a
                                className={`${authStyles["anchor-link"]} ${authStyles["bolding-text"]}`}
                            >
                                here
                            </a>
                        </Link>{" "}
                        and create new school.
                    </li>
                    <li>Add classes to the school too (like class:1,2,...)</li>
                    <li>
                        After creating new school, you will be taken to a page.
                        where it shows all the schools you have created.
                    </li>
                    <li>
                        Click one of the schools and on next page click{" "}
                        <b> "Add Test"</b> button on topright of your screen.
                    </li>
                    <li>
                        Create you test for a particular class and assign secret
                        code and test time for that test.
                    </li>
                    <li>
                        Then you can create upto <b>4 sections</b> for the test
                        u created.
                    </li>
                    <li>
                        The sections might be subjects (like sections: physics,
                        biology,... or sections: multiple-choice-1, fill in the
                        blanks...)
                    </li>
                    <li>
                        Now click the arrow pointing right on any of the
                        sections u created.
                    </li>
                    <li>
                        You will be taken to necessary section to create tests
                        with upto <b>25 questions per section.</b>
                    </li>
                </ul>
            </Card>
        </>
    );
};

export default AdminCard;
