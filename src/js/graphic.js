/* global d3 */
import enterView from 'enter-view';

const $minimap = d3.select('.minimap');
const $circleGroup = $minimap.select('#sections');
const $circles = $circleGroup.selectAll('circle');
const $sections = d3.selectAll('.examples--steps');

const circleMap = [];
$sections.each((d, i, node) => {
  const sel = d3.select(node[i]);
  const section = sel.attr('data-js');
  circleMap.push(section);
});

function setupEnterView() {
  enterView({
    selector: $sections.nodes(),
    enter: (el) => {
      const section = d3.select(el).attr('data-js');
      $circles.style('opacity', 0.3);
      if (section === 'question') {
        $minimap.classed('is-visible', true);
        $circleGroup.selectAll('#question, #data').style('opacity', 1);
      } else $circleGroup.select(`#${section}`).style('opacity', 1);
    },
    exit: (el, i) => {
      const section = d3.select(el).attr('data-js');
      $circles.style('opacity', 0.3);
      const thisI = circleMap.indexOf(section);
      const prevSection = circleMap[thisI - 1];
      if (section === 'exist') {
        $circleGroup.selectAll('#question, #data').style('opacity', 1);
      } else if (section === 'question') {
        $minimap.classed('is-visible', false);
      } else $circleGroup.select(`#${prevSection}`).style('opacity', 1);
    },
    once: false,
  });
}

function handleClick() {
  const $sel = d3.select(this);
  $circles.style('opacity', 0.3);
  $sel.style('opacity', 1);
  const section = $sel.attr('id');
  if (section == 'question' || section == 'data') {
    d3.select(`[data-js="question"]`).nodes()[0].scrollIntoView(false);
  } else {
    const text = d3.select(`[data-js="${section}"]`).nodes()[0];
    console.log({ text });
    text.scrollIntoView(false);
  }
}

function resize() {}

function init() {
  $circles.style('opacity', 0.3);
  setupEnterView();
  $circles.on('click', handleClick);
}

export default { init, resize };
