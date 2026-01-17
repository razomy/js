
<template>
  <div ref='razomy-diagram-container' class='razomy-diagram-container'> {{ 'Razomy diagram not loaded!' }}</div>
</template>

<style>
.razomy-diagram-container {
  overflow: hidden;
  width: 300px;
  height: 300px;
  border: solid 1px #3b8070;
}
</style>

<script lang='ts'>
import {RenderFactory, WebCanvasHighLightsRender} from '../web/canvas/renders';
import {WebSvgCodec} from '../web/svg/codecs';
import {WebSvgHighLightsRender, WebSvgRender} from '../web/svg/renders';
import {WebSvgContext} from '../web/svg';
import {Render} from '../../renderes';
import {SelectionAttribute, UserEntity} from '../../graphic';
import {ElementView} from '../../elements';
import { Component, Prop, Watch } from 'nuxt-property-decorator';
import {Vue} from 'vue';

@Component
export class RazomyDiagram extends Vue {
  @Prop({ default: '' }) public value: string;
  @Prop({ default: 'svg' }) public renderStrategy: 'svg' | 'canvas';
  @Prop({ default: 'svg' }) public parseStrategy: 'svg' | 'json';

  private socket: any;
  private user: UserEntity;
  private webSvgCodec: WebSvgCodec;
  private elementView: ElementView;
  private render: Render<ElementView>;

  @Watch('value')
  public onValueChange(): void {
    this.elementView = this.parseValueToElementView();
    this.user.getBy(SelectionAttribute).selection.add(this.elementView.children[1]);
    // const selected = this.user.getBy(SelectionAttribute).selection.first();
    this.render.render(this.elementView);
  }

  public mounted(): void {
    // const a = new WebBrowserInput();
    // this.socket = this.$nuxtSocket({
    //   channel: '/index'
    // });
    // this.socket.emit('method1', {
    //   hello: 'world'
    // }, (resp) => {
    //   /* Handle response, if any */
    // })
    /* Listen for events: */
    // this.socket
    //   .on('someEvent', (msg, cb) => {
    //     /* Handle event */
    //   })

    this.user = new UserEntity();
    const webSvgContext = WebSvgContext.create();
    this.webSvgCodec = new WebSvgCodec(
      webSvgContext.codecConfig,
      webSvgContext.encodeNodeFactory,
      webSvgContext.codecFactory,
      webSvgContext.codecRegistry
    );

    this.clearRoot();
    if (this.renderStrategy === 'svg') {
      const webSvgHighLightsRender = new WebSvgHighLightsRender(this.user);

      this.render = new WebSvgRender(
        webSvgContext.codecConfig,
        webSvgContext.encodeNodeFactory,
        webSvgContext.codecFactory,
        webSvgContext.codecRegistry,
        this.$refs['razomy-diagram-container'] as Node,
        webSvgHighLightsRender
      );
    } else {
      const canvas = document.createElement('canvas') as HTMLCanvasElement;

      // canvas.on('mouse:wheel', function(opt) {
      //   var delta = opt.e.deltaY;
      //   var zoom = canvas.getZoom();
      //   zoom *= 0.999 ** delta;
      //   if (zoom > 20) zoom = 20;
      //   if (zoom < 0.01) zoom = 0.01;
      //   canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
      //   opt.e.preventDefault();
      //   opt.e.stopPropagation();
      //   var vpt = this.viewportTransform;
      //   if (zoom < 400 / 1000) {
      //     vpt[4] = 200 - 1000 * zoom / 2;
      //     vpt[5] = 200 - 1000 * zoom / 2;
      //   } else {
      //     if (vpt[4] >= 0) {
      //       vpt[4] = 0;
      //     } else if (vpt[4] < canvas.getWidth() - 1000 * zoom) {
      //       vpt[4] = canvas.getWidth() - 1000 * zoom;
      //     }
      //     if (vpt[5] >= 0) {
      //       vpt[5] = 0;
      //     } else if (vpt[5] < canvas.getHeight() - 1000 * zoom) {
      //       vpt[5] = canvas.getHeight() - 1000 * zoom;
      //     }
      //   })

      canvas.width = 300;
      canvas.height = 300;
      (this.$refs['razomy-diagram-container'] as HTMLDivElement).appendChild(canvas);
      const ctx = canvas.getContext('2d');
      const rf = new RenderFactory(ctx);
      const webCanvasHighLightsRender = new WebCanvasHighLightsRender(this.user, ctx, rf);
      this.render = new WebCanvasRender(
        new RenderFactory(ctx),
        ctx,
        webCanvasHighLightsRender
      );
    }

    this.onValueChange();
  }

  public destroyed() {
    // delete this.svgCodec;
    // delete this.svgDomRender;
  }

  private clearRoot(): void {
    const myNode = this.$refs['razomy-diagram-container'] as any;
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
  }

  private parseValueToElementView(): ElementView {
    const parser = new DOMParser();
    const dom = parser.parseFromString(this.value, 'image/svg+xml');
    return this.webSvgCodec.decode(dom.childNodes.item(0));
  }
}
</script>
