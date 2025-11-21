'use client';

import { useRef } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import type { Identifier } from 'dnd-core';
import { WidgetConfig } from '@/types';
import { FiMove } from 'react-icons/fi';

interface DraggableWidgetItemProps {
  widget: WidgetConfig;
  index: number;
  moveWidget: (dragIndex: number, hoverIndex: number) => void;
  onToggleVisibility: (widgetId: string) => void;
}

interface DragItem {
  id: string;
  index: number;
}

const ItemType = 'SETTINGS_WIDGET';

export default function DraggableWidgetItem({
  widget,
  index,
  moveWidget,
  onToggleVisibility,
}: DraggableWidgetItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: ItemType,
    collect(monitor: DropTargetMonitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: { index: number }, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveWidget(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: () => {
      return { id: widget.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      data-handler-id={handlerId}
      className={`flex items-center gap-3 p-3 rounded-lg bg-accent/50 cursor-grab active:cursor-grabbing transition-all ${
        isDragging ? 'ring-2 ring-primary-500' : ''
      }`}
    >
      <FiMove className="h-4 w-4 text-foreground/40 flex-shrink-0" />

      <span className="flex-1 text-foreground font-medium">{widget.label}</span>

      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={widget.visible}
          onChange={() => onToggleVisibility(widget.id)}
          className="sr-only peer"
        />
        <div className="w-9 h-5 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-500"></div>
      </label>
    </div>
  );
}
