import { Result, Button, Layout, Statistic } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

const { Countdown } = Statistic;

const Fourofour = () => {
    const router = useRouter();

    const deadline = Date.now() + 6 * 1000;

    const onFinish = () => {
        router.push("/");
    };
    return (
        <Layout style={{ height: "100vh" }}>
            <Result
                status="404"
                title="404"
                // subTitle="Sorry, the page you visited does not exist."
                subTitle={
                    <div>
                        <div>Sorry, the page you visited does not exist.</div>
                        <div>
                            {/* Redirecting in */}
                            <Countdown
                                valueStyle={{ fontSize: 16, marginTop: 5 }}
                                format="s"
                                prefix="Re-directing in"
                                value={deadline}
                                onFinish={onFinish}
                            />
                        </div>
                    </div>
                }
                extra={
                    <Link href="/">
                        <Button type="primary">Back Home</Button>
                    </Link>
                }
            />
        </Layout>
    );
};

export default Fourofour;
