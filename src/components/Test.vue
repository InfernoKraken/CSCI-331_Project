<script>
import html2canvas from 'html2canvas';
export default {
  data() {
    return {
      screenshot: null,
      isSelecting: false,
      selection: {
        startX: 0,
        startY: 0,
        width: 0,
        height: 0,
      },
      selectionReady: false,
    };
  },

  computed: {
    selectionStyle() {
      //Here is the magic of dynamically sizing the selection box as the user drags:
      return {
        left: `${this.selection.startX}px`,
        top: `${this.selection.startY}px`,
        width: `${this.selection.width}px`,
        height: `${this.selection.height}px`,
      };
    },
  },

  methods: {
    startSelection(event) {
      //Init Selection:
      this.isSelecting = true;
      this.selectionReady = false;
      this.selection.startX = event.offsetX;
      this.selection.startY = event.offsetY;
      this.selection.width = 0;
      this.selection.height = 0;

      //Event listeners added to track mouse movement:
      window.addEventListener("mousemove", this.updateSelection);
      window.addEventListener("mouseup", this.endSelection);
    },

    updateSelection(event) {
      if (this.isSelecting) {
        //Get height and width based off mouse postion:
        this.selection.width = event.offsetX - this.selection.startX;
        this.selection.height = event.offsetY - this.selection.startY;
      }
    },

    endSelection() {
      //Re-enable selection when done selecting:
      this.isSelecting = false;
      this.selectionReady = true;
      //Event listeners are to be removed when the selection is finished:
      window.removeEventListener("mousemove", this.updateSelection);
      window.removeEventListener("mouseup", this.endSelection);
    },

    async takeScreenshot() {
      if (this.selectionReady) {
        //Capture the element with html2canvas
        const canvas = await html2canvas(this.$refs.captureContent, {
          x: this.selection.startX,
          y: this.selection.startY,
          width: this.selection.width,
          height: this.selection.height,
        });
        //Now convert the canvas to an image url for use:
        this.screenshot = canvas.toDataURL("image/png");
      }
    },
  },
};
</script>

<!--User defined bounds:-->
<template>
  <div>
    <div ref="captureContent" class="content" @mousedown="startSelection">
      <h2>Screenshot Content</h2>
      <p>Click and drag to select an area to capture.</p>
    </div>

    <!--Capture Button-->
    <button @click="takeScreenshot" :disabled="!selectionReady">
      Capture the selected area.
    </button>

    <!--We can also display the screenshot preview like so:-->
    <div v-if="screenshot" class="preview">
      <h3>Screenshot Preview</h3>
      <img :src="screenshot" alt="Screenshot Preview" />
    </div>

    <!--Overlay for selector-->
    <div v-if="isSelecting" :style="selectionStyle" class="selection-box">
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
</style>