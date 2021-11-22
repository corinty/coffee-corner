import { MenuItem } from "./MenuItem";
import { useMenu } from "./hooks/useMenu";

type Props = {};
export const Menu = ({}: Props) => {
    const [menu] = useMenu();
    if (!menu) return <p className="text-red-600">Error Loading Menu...</p>;
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
