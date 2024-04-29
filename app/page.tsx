"use client";

import React, { useState } from "react";
import Card from "./components/Card";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const Home = () => {
  const data = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet.",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit",
    },

    {
      id: 2,
      title: "Lorem ipsum dolor sit amet.",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit",
    },
    {
      id: 3,
      title: "Lorem ipsum dolor sit amet.",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit",
    },

    {
      id: 4,
      title: "Lorem ipsum dolor sit amet.",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit",
    },

    {
      id: 5,
      title: "Lorem ipsum dolor sit amet.",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit",
    },

    {
      id: 6,
      title: "Lorem ipsum dolor sit amet.",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit",
    },

    {
      id: 7,
      title: "Lorem ipsum dolor sit amet.",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit",
    },

    {
      id: 8,
      title: "Lorem ipsum dolor sit amet.",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit",
    },

    {
      id: 9,
      title: "Lorem ipsum dolor sit amet.",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit",
    },

    {
      id: 10,
      title: "Lorem ipsum dolor sit amet.",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit",
    },
  ];
  const [items, setItems] = useState(data);

  const handleClick = () => {
    setItems((prevItems) => [
      ...prevItems,
      {
        id: prevItems.length + 1,
        title: "Lorem ipsum dolor sit amet.",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit",
      },
    ]);
  };

  // sensor
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // handle drag end
  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.map((item) => item.id).indexOf(active.id);
        const newIndex = items.map((item) => item.id).indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className="p-12">
      <button
        onClick={handleClick}
        className="bg-violet-500 py-2 px-3 rounded-full text-white mb-5"
      >
        Add new
      </button>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          <SortableContext items={items}>
            {items.map((item, index) => (
              <Card key={item.id} item={item} index={index} />
            ))}
          </SortableContext>
        </div>
      </DndContext>
    </div>
  );
};

export default Home;
