import {StyleSheet} from 'react-native';
const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  fg1: {
    flexGrow: 1,
  },
  c: x => ({color: x}),
  oh: {
    overflow: 'hidden',
  },
  cf: {
    color: '#fff',
  },
  clb: {
    color: '#016df5',
  },
  cr: {
    color: 'red',
  },
  bg: x => ({backgroundColor: x}),
  bgcf: {
    backgroundColor: '#fff',
  },
  fdr: {
    flexDirection: 'row',
  },
  fdc: {
    flexDirection: 'column',
  },
  aic: {
    alignItems: 'center',
  },
  jcc: {
    justifyContent: 'center',
  },
  jcsb: {
    justifyContent: 'space-between',
  },
  jcfe: {
    justifyContent: 'flex-end',
  },
  fwb: {
    fontWeight: 'bold',
  },
  fs: x => ({fontSize: x}),
  h: x => ({height: x}),
  w: x => ({width: x}),
  wh: (x, y) => ({width: x, height: y || x}),

  ml: x => ({marginLeft: x}),
  mr: x => ({marginRight: x}),
  mt: x => ({marginTop: x}),
  mb: x => ({marginBottom: x}),
  mlr: x => ({marginLeft: x, marginRight: x}),
  mtb: x => ({marginTop: x, marginBottom: x}),
  ma: x => ({marginTop: x, marginBottom: x, marginLeft: x, marginRight: x}),

  pl: x => ({paddingLeft: x}),
  pr: x => ({paddingRight: x}),
  pt: x => ({paddingTop: x}),
  pb: x => ({paddingBottom: x}),
  plr: x => ({paddingLeft: x, paddingRight: x}),
  ptb: x => ({paddingTop: x, paddingBottom: x}),
  pa: x => ({paddingTop: x, paddingBottom: x, paddingLeft: x, paddingRight: x}),

  bw: x => ({borderWidth: x}),
  bt: x => ({borderTopWidth: x}),
  bb: x => ({borderBottomWidth: x}),
  bl: x => ({borderLeftWidth: x}),
  br: x => ({borderRightWidth: x}),

  bc: x => ({borderColor: x}),
  btc: x => ({borderTopColor: x}),
  bbc: x => ({borderBottomColor: x}),
  blc: x => ({borderLeftColor: x}),
  brc: x => ({borderRightColor: x}),

  bra: x => ({borderRadius: x}),

  poa: {position: 'absolute'},
  por: {position: 'relative'},
  t0: {top: 0},
  l0: {left: 0},
  r0: {right: 0},
  b0: {bottom: 0},
  t1: {top: '100%'},
  l1: {left: '100%'},
  r1: {right: '100%'},
  b1: {bottom: '100%'},
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  shadow1: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  z: x => ({zIndex: x}),
  // bb: x => ({borderBottomWidth:x})
});
export default s;
