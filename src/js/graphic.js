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

function handleEnterView() {
  const sel = d3.select(this);
  // const section = sel.attr('data-js');
  console.log({ sel });
}

function setupEnterView() {
  enterView({
    selector: $sections.nodes(),
    enter: (el) => {
      const section = d3.select(el).attr('data-js');
      $circles.style('opacity', 0.3);
      if (section === 'question') {
        $circleGroup.selectAll('#question, #data').style('opacity', 1);
      } else $circleGroup.select(`#${section}`).style('opacity', 1);
      console.log({ circleMap });
    },
    exit: (el, i) => {
      const section = d3.select(el).attr('data-js');
      $circles.style('opacity', 0.3);
      const thisI = circleMap.indexOf(section);
      const prevSection = circleMap[thisI - 1];
      if (section === 'exist') {
        $circleGroup.selectAll('#question, #data').style('opacity', 1);
      } else $circleGroup.select(`#${prevSection}`).style('opacity', 1);
      console.log({ exiting: section, i });
    },
    once: false,
  });
}

function resize() {}

function init() {
  $circles.style('opacity', 0.3);
  setupEnterView();
}

export default { init, resize };
