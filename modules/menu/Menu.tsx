import { MenuItem } from "./MenuItem";
import { IMenu } from "./@types";

type Props = {
    menu: IMenu;
};
export const Menu = ({ menu }: Props) => {
    const { itemMap, types } = menu;
    return (
        <div title="Menu">
            {Object.entries(types).map(([typeName, itemIds]) => (
                <div key={typeName}>
                    <p className="my-3">{typeName}</p>
                    <hr />
                    <ul>
                        {itemIds.map((id) => (
                            <li key={id} className="py-4">
                                <MenuItem item={itemMap[id]} />
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};
