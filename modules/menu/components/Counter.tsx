import produce from "immer";
import { FunctionComponent } from "react";

type Props = {
    value: string;
    onChange: (nextValue: string) => void;
    max?: number;
};

enum ActionType {
    increment,
    decrement,
}

const Counter: React.FC<Props> = ({ value, onChange, max }: Props) => {
    const valueInt = parseInt(value);
    const handleClick = async (actionType: ActionType) => {
        const nextValue = () => {
            let draft = parseInt(value);
            if (actionType == ActionType.increment) draft++;
            if (actionType == ActionType.decrement) draft--;

            return draft.toString();
        };

        onChange(nextValue());
    };
    return (
        <div className="flex items-center gap-3 overflow-hidden flex-shrink-2">
            <button
                name="increment"
                onClick={() => handleClick(ActionType.decrement)}
                disabled={valueInt <= 0}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </button>
            <input
                value={value}
                type="number"
                onChange={({ target: { value } }) => {
                    onChange(value);
                }}
                pattern="[0-9]*"
                className="px-3 py-1 text-xl text-center border-2 border-black border-solid rounded "
            ></input>
            <button
                name="decrement"
                onClick={() => handleClick(ActionType.increment)}
                disabled={max ? valueInt >= max : false}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </button>
            <style jsx>{`
                button {
                    background: var(--secondary);
                }
            `}</style>
        </div>
    );
};
export default Counter;
