// ./pages/demo
import React, { useEffect } from "react";

import Link from "next/link";
import { useSession } from "next-auth/react";

const Demo = () => {
    const { data } = useSession();

    console.log(data);

    return (
        <div>
            <Link href="/">
                <a>This is the way</a>
            </Link>
            Another way is the way
        </div>
    );
};

export default Demo;
