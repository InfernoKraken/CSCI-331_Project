<script>
import html2canvas from 'html2canvas';

export default {
  data() {
    return {
      screenshot: null,
      isSelecting: false,
      startX: 0,
      startY: 0,
      selectionElement: null,
    };
  },
  methods: {
    startSelection() {
      this.isSelecting = true;

      // Change the mouse pointer to crosshairs
      document.body.style.cursor = 'crosshair';

      // Add event listenerst to track the mouse movements
      document.addEventListener('mousedown', this.onMouseDown);
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
    },
    onMouseDown(event) {
      if (!this.isSelecting) return;

      this.startX = event.pageX;
      this.startY = event.pageY;

      // Create the selection box
      this.selectionElement = document.createElement('div');
      this.selectionElement.className = 'selection-box';
      document.body.appendChild(this.selectionElement);

      // Create the selection area
      this.updateSelection(event.pageX, event.pageY);
    },
    onMouseMove(event) {
      if (!this.selectionElement) return;

      // Update the selection area as the mouse moves
      this.updateSelection(event.pageX, event.pageY);
    },
    onMouseUp(event) {
      if (!this.selectionElement) return;

      // Finalize the selection and capture it
      const selectionRect = this.selectionElement.getBoundingClientRect();
      document.body.removeChild(this.selectionElement);
      this.selectionElement = null;

      this.captureSelection(selectionRect);

      // Reset the cursor back to default
      document.body.style.cursor = 'default';

      // Clean up event listeners
      document.removeEventListener('mousedown', this.onMouseDown);
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);

      this.isSelecting = false;
    },
    updateSelection(currentX, currentY) {
      const x = Math.min(this.startX, currentX);
      const y = Math.min(this.startY, currentY);
      const width = Math.abs(this.startX - currentX);
      const height = Math.abs(this.startY - currentY);

      Object.assign(this.selectionElement.style, {
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
        position: 'absolute',
        border: '2px dashed #000',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        pointerEvents: 'none',
      });
    },
    captureSelection(rect) {
      html2canvas(document.body, {
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
      }).then((canvas) => {
        this.screenshot = canvas.toDataURL();
      });
    },
  },
};
</script>

<template>
  <div>
    <p>Click to activate area selection.</p>
    <button @click="startSelection">Select area</button>

    <div v-if="screenshot" class="preview">
      <h3>Screenshot Preview</h3>
      <img :src="screenshot" alt="Screenshot Preview" />
    </div>
  </div>
</template>

//TODO: Can add styles this way:
<style scoped>
button {
  margin-top: 10px;
  padding: 10px 15px;
  cursor: pointer;
}

.content{
  position: relative;
  padding: 20px;
  border: 1px solid #ccc;
  cursor: crosshair;
}

.preview img{
  border: 1px solid #000;
  max-width: 100%;
}

.selection-box{
  position: absolute;
  border: 2px dashed #000;
  background-color: rgba(0, 0, 0, 0.1);
  pointer-events: none;
}

.preview {
  margin-top: 2rem;
}
</style>