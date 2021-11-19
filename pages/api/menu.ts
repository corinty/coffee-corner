import { generateMenu } from "@db/generateMenu";

const handler = async (req, res) => {
    res.json(await generateMenu());
};

export default handler;
