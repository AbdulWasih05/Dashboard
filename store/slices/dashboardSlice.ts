import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DashboardState, WidgetConfig } from '@/types';
import { DEFAULT_WIDGETS } from '@/utils/constants';

const initialState: DashboardState = {
  widgets: DEFAULT_WIDGETS,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setWidgets: (state, action: PayloadAction<WidgetConfig[]>) => {
      state.widgets = action.payload;
    },
    moveWidget: (state, action: PayloadAction<{ dragIndex: number; hoverIndex: number }>) => {
      const { dragIndex, hoverIndex } = action.payload;
      const newWidgets = [...state.widgets];
      const draggedWidget = newWidgets[dragIndex];
      newWidgets.splice(dragIndex, 1);
      newWidgets.splice(hoverIndex, 0, draggedWidget);
      // Update order values
      newWidgets.forEach((widget, index) => {
        widget.order = index;
      });
      state.widgets = newWidgets;
    },
    toggleWidgetVisibility: (state, action: PayloadAction<string>) => {
      const widget = state.widgets.find(w => w.id === action.payload);
      if (widget) {
        widget.visible = !widget.visible;
      }
    },
    resetLayout: (state) => {
      state.widgets = DEFAULT_WIDGETS;
    },
  },
});

export const { setWidgets, moveWidget, toggleWidgetVisibility, resetLayout } = dashboardSlice.actions;
export default dashboardSlice.reducer;
