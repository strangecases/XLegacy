import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { Row, Card, Col, Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import navStyles from "../styles/modules/Navstyles.module.css";
import allActions from "../store/actions";

const { Search } = Input;

const NavBar = () => {
    const { admin } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const { ref: containerRef, inView: isVisible } = useInView({
        rootMargin: "-550px 0px 0px 0px",
    });

    const { ref: rowRef, inView: isRowVisible } = useInView({
        rootMargin: "0px 0px -50% 0px",
        triggerOnce: true,
    });

    const { ref: boardRef, inView: isBoardVisible } = useInView({
        rootMargin: "0px 0px -50% 0px",
        triggerOnce: true,
    });

    const { ref: secondCardRef, inView: isSecondCardVisible } = useInView({
        rootMargin: "0px 0px -70% 0px",
        triggerOnce: true,
    });

    const { ref: ballRef, inView: isballVisible } = useInView({
        rootMargin: "0px 0px -25% 0px",
        triggerOnce: true,
    });

    const toggleButton = useRef();
    const navBarLinks = useRef();
    const navbarRef = useRef();

    useEffect(() => {
        toggleButton.current.addEventListener("click", () => {
            navBarLinks.current.classList.toggle(navStyles.active);
        });
    }, []);

    // useEffect(() => {
    //     const options = {
    //         rootMargin: "-70px 0px 0px 0px",
    //         // threshold: 1.0,
    //     };
    //     const observer = new IntersectionObserver((entries) => {
    //         const entry = entries[0];

    //         if (!entry.isIntersecting) {
    //             navbarRef.current.classList.add(navStyles.backgroundNav);
    //             divRef.current.classList.add(navStyles.backgroundNavDiv);
    //         } else {
    //             navbarRef.current.classList.remove(navStyles.backgroundNav);
    //             divRef.current.classList.remove(navStyles.backgroundNavDiv);
    //         }
    //     }, options);

    //     if (containerRef.current) observer.observe(containerRef.current);
    //     return () => {
    //         observer.disconnect();
    //     };
    // }, []);

    const onLogOutClick = async () => {
        dispatch(allActions.adminActions.logOut());
    };

    const onSearch = async (value) => {
        dispatch(allActions.schoolActions.getSchoolOnSearch(value));
    };

    return (
        <>
            <div className={navStyles.bodyStyle}>
                <header className={navStyles["header-nav"]}>
                    <nav
                        ref={navbarRef}
                        className={`${navStyles.navbar} ${
                            !isVisible && navStyles.backgroundNav
                        } ${!isVisible && navStyles.backgroundNavDiv}`}
                    >
                        <div className={navStyles["brand-title"]}>
                            Scholar X
                        </div>
                        <a
                            ref={toggleButton}
                            className={navStyles["toggle-button"]}
                        >
                            <span className={navStyles.bar} />
                            <span className={navStyles.bar} />
                            <span className={navStyles.bar} />
                        </a>
                        <div
                            ref={navBarLinks}
                            className={navStyles["navbar-links"]}
                        >
                            {admin === null ? (
                                <ul className={navStyles["navbar-ul"]}>
                                    <li>
                                        <Link href="/login">
                                            <a>Login</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            <a>SignUp</a>
                                        </Link>
                                    </li>
                                </ul>
                            ) : (
                                <ul className={navStyles["navbar-ul"]}>
                                    <li>
                                        <div>
                                            <a
                                                onClick={onLogOutClick}
                                                onKeyDown={onLogOutClick}
                                                role="link"
                                                tabIndex={0}
                                            >
                                                Logout
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </nav>
                </header>
                <div className={navStyles.homeIntro}>
                    <div className={navStyles.container}>
                        <div ref={containerRef} className={navStyles.mainPage}>
                            <div className={navStyles.parentRelativeOne}>
                                <img
                                    src="28916370-removebg-preview.png"
                                    alt="Girl in a jacket"
                                    width="480"
                                    height="500"
                                    className={navStyles.imggscewBook}
                                />

                                <img
                                    src="png-transparent-colored-pencil-pastel-pencil-free-s-angle-pencil-orange-thumbnail-removebg-preview.png"
                                    alt="Girl in a jacket"
                                    width="150"
                                    height="300"
                                    className={navStyles.imggscewOne}
                                />
                            </div>
                            <div
                                className={`${navStyles.homeText} ${navStyles.homeTextMargin}`}
                            >
                                <span className={navStyles.homeHeading}>
                                    Take a test with Scholar X
                                </span>
                                <p className={navStyles.paraText}>
                                    Search for your school{" "}
                                </p>
                                <Search
                                    placeholder="Enter School Code"
                                    size="large"
                                    onSearch={onSearch}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={navStyles.bgOne}>
                    <div className={navStyles.containerCard}>
                        <Row
                            gutter={[20, 16]}
                            ref={rowRef}
                            align="middle"
                            className={navStyles.firstRow}
                        >
                            <Col xs={24} sm={12} md={8} lg={8} span={8}>
                                <Card
                                    cover={
                                        <img
                                            alt="example"
                                            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                                            height={200}
                                        />
                                    }
                                    className={` ${
                                        isRowVisible &&
                                        navStyles.firstCardStyleOne
                                    } ${navStyles.firstCardStyle}`}
                                >
                                    <span
                                        className={
                                            isRowVisible
                                                ? navStyles.cardBody
                                                : ""
                                        }
                                    >
                                        ScholarX is a online examination tool
                                        designed to conduct scholarship test,
                                        online examinations , entrance test,
                                        recruitment test and a lot more.
                                    </span>
                                </Card>
                            </Col>
                            <Col xs={24} sm={12} lg={8} md={8} span={8}>
                                <Card
                                    cover={
                                        <img
                                            alt="example"
                                            src="https://images.unsplash.com/photo-1517976487492-5750f3195933?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                                            height={200}
                                        />
                                    }
                                    className={` ${
                                        isRowVisible &&
                                        navStyles.firstCardStyleTwo
                                    } ${navStyles.firstCardStyle}`}
                                >
                                    <span
                                        className={
                                            isRowVisible
                                                ? navStyles.cardBody
                                                : ""
                                        }
                                    >
                                        Schools or organizations can manage all
                                        the tests in a well designed structural
                                        format and easily share the links to any
                                        particular test with examinees.
                                    </span>
                                </Card>
                            </Col>
                            <Col xs={24} sm={12} md={8} lg={8} span={8}>
                                <Card
                                    cover={
                                        <img
                                            alt="example"
                                            src="https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
                                            height={200}
                                        />
                                    }
                                    className={` ${
                                        isRowVisible &&
                                        navStyles.firstCardStyleThree
                                    } ${navStyles.firstCardStyle}`}
                                >
                                    <span
                                        className={
                                            isRowVisible
                                                ? navStyles.cardBody
                                                : ""
                                        }
                                    >
                                        ScholarX makes it easy to incorporate
                                        tests from others i.e you can attach
                                        others tests to your organization
                                        without writing the test yourself.
                                    </span>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className={navStyles.bgTwo}>
                    <div className={navStyles.container} ref={boardRef}>
                        <div
                            className={
                                isBoardVisible ? `${navStyles.mainPage}` : ""
                            }
                        >
                            <div
                                className={`${
                                    isBoardVisible && navStyles.homeText
                                } ${navStyles.homeTextDisplay}`}
                            >
                                <span
                                    className={
                                        isBoardVisible && navStyles.homeHeading
                                    }
                                >
                                    ScholarX makes it easy to manage your school
                                    tests.
                                </span>
                                <p
                                    className={
                                        isBoardVisible && navStyles.paraText
                                    }
                                >
                                    Please Login and checkout our proposition{" "}
                                </p>
                                <Row gutter={[8, 16]}>
                                    <Col>
                                        <Button>Login</Button>
                                    </Col>
                                    <Col>
                                        <Button>SignUp</Button>
                                    </Col>
                                </Row>
                            </div>
                            <div
                                className={` ${
                                    isBoardVisible &&
                                    navStyles.parentRelativeTwo
                                } `}
                            >
                                <img
                                    src="green-board-500x500-removebg-preview.png"
                                    alt="Girl in a jacket"
                                    width="150"
                                    height="300"
                                    className={`${
                                        isBoardVisible && navStyles.imggBoard
                                    } ${navStyles.homeTextDisplay}`}
                                />

                                <img
                                    src="empty-black-chalk-board-white-chalk-sticks_116441-11538-removebg-preview.png"
                                    alt="Girl in a jacket"
                                    width="150"
                                    height="300"
                                    className={`${
                                        isBoardVisible && navStyles.imggChalk
                                    } ${
                                        isBoardVisible && navStyles.imggChalkOne
                                    } ${navStyles.homeTextDisplay}`}
                                />

                                <img
                                    src="empty-black-chalk-board-white-chalk-sticks_116441-11538-removebg-preview.png"
                                    alt="Girl in a jacket"
                                    width="150"
                                    height="300"
                                    className={`${
                                        isBoardVisible && navStyles.imggChalk
                                    } ${
                                        isBoardVisible && navStyles.imggChalkTwo
                                    } ${navStyles.homeTextDisplay}`}
                                />

                                <img
                                    src="empty-black-chalk-board-white-chalk-sticks_116441-11538-removebg-preview.png"
                                    alt="Girl in a jacket"
                                    width="150"
                                    height="300"
                                    className={`${
                                        isBoardVisible && navStyles.imggChalk
                                    } ${
                                        isBoardVisible &&
                                        navStyles.imggChalkThree
                                    } ${navStyles.homeTextDisplay}`}
                                />

                                <img
                                    src="chalkboard-eraser-large-removebg-preview.png"
                                    alt="Girl in a jacket"
                                    width="150"
                                    height="300"
                                    className={`${
                                        isBoardVisible && navStyles.imggDuster
                                    } ${navStyles.homeTextDisplay}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={navStyles.bgThree}>
                    <div
                        ref={secondCardRef}
                        className={
                            isSecondCardVisible && navStyles.containerCard
                        }
                    >
                        <Row
                            align="middle"
                            justify="center"
                            gutter={[16, 8]}
                            className={navStyles.firstRow}
                        >
                            <Col xs={24} sm={24} md={7} span={8}>
                                <Card
                                    className={`${navStyles.secondCardStyle} ${
                                        isSecondCardVisible &&
                                        navStyles.secondCardStyleOne
                                    }`}
                                >
                                    <p className={navStyles.cardParagraph}>
                                        ScholarX conducts scholarship tests for
                                        students (VII - XII) and grants
                                        scholarships of upto 10,000rs.
                                    </p>
                                </Card>
                            </Col>
                            <Col xs={24} sm={24} md={10} span={8}>
                                <Card
                                    className={`${
                                        navStyles.secondCardStyleMiddle
                                    } ${
                                        isSecondCardVisible &&
                                        navStyles.secondCardStyleTwo
                                    }`}
                                >
                                    <p className={navStyles.cardParagraph}>
                                        ScholarX can only afford to do this by
                                        collecting entrance fees and
                                        re-distributing the collected fees as
                                        scholarships to a lot of students who
                                        perform well in wide range of tests.{" "}
                                    </p>
                                </Card>
                            </Col>
                            <Col xs={24} sm={24} md={7} span={8}>
                                <Card
                                    className={`${navStyles.secondCardStyle} ${
                                        isSecondCardVisible &&
                                        navStyles.secondCardStyleThree
                                    }`}
                                >
                                    <p className={navStyles.cardParagraph}>
                                        70% of collected entrance fee will go
                                        back to students and the remaining 30%
                                        is used to run our servers
                                    </p>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>

            <div className={`${navStyles.orderCounter}`}>
                <div className={` ${navStyles.containerCard}`} ref={ballRef}>
                    <h2>How to use Scholar X ?</h2>
                    <h3 className={isballVisible && navStyles.orderSection}>
                        Initial Setup
                    </h3>
                    <p>
                        Initial setup is very easy, you just need to login or
                        signUp with your email and password and you will be
                        taken to your{" "}
                        <Link href="/admin">
                            <a className={navStyles.anchor}>dashboard</a>
                        </Link>
                        .
                    </p>
                    <h3 className={isballVisible && navStyles.orderSection}>
                        Adding a new school / organization.
                    </h3>
                    <p>
                        On the left hand side click on{" "}
                        <span className={navStyles.fontBold}>
                            &quot;Add school&quot;
                        </span>{" "}
                        and you will be taken to a form where you can add
                        details about your school such as school code, address,
                        classes, groups/sections.
                    </p>
                    <h3 className={isballVisible && navStyles.orderSection}>
                        Adding Tests.
                    </h3>
                    <p className={navStyles.pSibling}>
                        After adding a school / organization you can now add a
                        test with test time,test code,... this will start you on
                        a path to creating tour test.
                    </p>
                    <p>
                        You can create tests based on the classes you mentioned
                        during your school setup.
                    </p>
                    <h3 className={isballVisible && navStyles.orderSection}>
                        Adding sections to your tests.
                    </h3>
                    <p>
                        Now you can add sections of upto 4 to your tests and
                        each section can contain upto 25 questions each that
                        means our entire test has a capcity of upto 100
                        questions.
                    </p>
                    <h3 className={isballVisible && navStyles.orderSection}>
                        Results
                    </h3>
                    <p className={navStyles.pSibling}>
                        On the results page you can view results based on groups
                        / sections of a said class in a school / organization
                        and sort the results based on marks obtained on the
                        results table.
                    </p>
                    <p>
                        Results page has nice layout with animated donutpie
                        chart and table with all necessary information. you can
                        visit each examinees page to check how they performed in
                        a particular test.
                    </p>
                    <h3 className={isballVisible && navStyles.orderSection}>
                        Adding tests from other schools / organizations.
                    </h3>
                    <p>
                        Scholar X makes it easy to add tests from other schools
                        / organizations just by pasting the link that is
                        published by others in{" "}
                        <span className={navStyles.fontBold}>
                            &quot;Add others tests&quot;
                        </span>{" "}
                        form and just publish the link of that added test to
                        examinees.
                    </p>
                </div>
            </div>

            <footer className={navStyles.footerStyle}>
                <Row justify="center" gutter={[16, 4]}>
                    <Col span={24}>
                        <p className={navStyles.footerParagraph}>
                            Login now and start creating tests.
                        </p>
                    </Col>
                    <Col>
                        <Link href="/login">
                            <a>Login</a>
                        </Link>
                    </Col>
                    <Col>
                        <Link href="/register">
                            <a>Signup</a>
                        </Link>
                    </Col>
                </Row>
            </footer>
        </>
    );
};

NavBar.getLayout = (page) => page;

export default NavBar;
