import { NextPage } from "next";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface IType {
  id: number;
  title: string;
  body: string;
}

interface Props {
  item: IType;
  index: number;
}

const Card: NextPage<Props> = ({ item: { id, title, body }, index }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });

  // style
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    gridRowStart: `${index == 0 ? "span 2" : "span 1"}`,
    gridColumnStart: `${index == 0 ? "span 2" : "span 1"}`,
    transformOrigin: "0 0 ",
  };

  return (
    <div
      className={`bg-violet-400 p-5 rounded-lg border ${
        isDragging && "z-50 cursor-move"
      }`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <h2 className="text-white text-3xl">
        {title}: {id}
      </h2>
      <p className="text-white text-base">{body}</p>
    </div>
  );
};

export default Card;
