function main(args)
*======================================================================================
* Script created by: Bryan Burlingame - (2013-2014)
***************************************************************************************

latmin=subwrd(args,1)
latmax=subwrd(args,2)
lonmin=subwrd(args,3)
lonmax=subwrd(args,4)
model=subwrd(args,5)

'reinit'
'set display color white'
'open /tornado/r1/bmburlin/NCEP/HRRR/HRRR.ctl'
'set vpage 0 11.0 0 8.5'
'set parea 0.1 10.1 .3 7.9'
'set mpdraw on'
'set mpdset hires'
'set mpt 0 1 1 1'
'set mpt 1 1 1 1'
'set mpt 2 1 1 1'
'set xlab off'
'set ylab off'
'set grid off'
'set mproj scaled'
'set lat 'latmin ' 'latmax
'set lon 'lonmin ' 'lonmax

'q file'
rec=sublin(result,5)
numbfor=subwrd(rec,12)
ee=subwrd(rec,15)

  'q time'
  init = subwrd(result,3)
  inittime = substr(init,1,12)
  initday = substr(init,4,2)
  inithr = substr(init,1,3)
  initmonth = substr(init,6,3)
  inityr = substr(init,9,12)

vvlevs="925 850 700 500 250"
wlev=1
while (wlev<=5)
  lev=subwrd(vvlevs,wlev)

  count = 0
  t = 1
  fhr = 0
  inc = 1

  'run colors/colors_vertical_velocity.gs'

  while (count < numbfor)
    'set t 't
*  ====================================*
*  ===For the "VALID" forecast hour====*
    'q time'
    res = subwrd(result,3)
    Z_temp = substr(res,3,1)

    if (Z_temp = Z )
      vtime = substr(res,1,12)
      vhr = substr(vtime,1,2)
      vmonth = substr(vtime,6,3)
      vday = substr(vtime,4,2)
      vyr = substr(vtime,9,12)
      vmin = 00
    else
      vtime = substr(res,1,15)
      vhr = substr(vtime,1,2)
      vmonth = substr(vtime,9,3)
      vday = substr(vtime,7,2)
      vyr = substr(vtime,12,12)
      vmin = substr(vtime,4,2)
    endif
*  ************************************

    'set grads off'
    'set lev 'lev
    'set clevs -48 -45 -42 -39 -36 -33 -30 -27 -24 -21 -18 -16 -14 -12 -10 -8 -6 -4 -2'
    'set ccols 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 0'
    'set gxout shaded'
    'd vvelprs'

  if (model = "glHRRR")
    'set rgb 255 128 128 128 100'
    'set line 255 1 0.001'
    'draw shp /tornado/r1/bmburlin/NCEP/misc/shapefiles/counties/dtl_cnty.shp'
  endif
    'set rgb 254   0   3 229 100'
    'set line 254 1 0.01'
    'draw shp /tornado/r1/bmburlin/NCEP/misc/shapefiles/highways/in101503.shp'
    'set line 1 1 1'
    'draw shp /tornado/r1/bmburlin/NCEP/misc/shapefiles/states/dtl_st.shp'

    'set gxout contour'
    'set ccolor 1'
    'set cthick 4'
    'set cint 30'
    'set clab masked'
    'set clopts -1 4 0.08'
    'd smth9(HGTprs)'    

*  ===Runs colorbar and prints all text seen on image===*
  'run colorbar/xcbar.gs -direction v -fs 1 -fw .12 -fh .12 -line'
  'set strsiz 0.15'
  'set string 1 l 2'
  'draw string .1 8.25 'lev'mb Vertical Velocity (pa/s), Heights (gpm)'
  'set strsiz 0.11'
  'draw string .1 8.02 Initialized: 'inithr': 'initmonth' 'initday', 'inityr' -- Forecast Hour ['fhr':00]'
  'set string 1 r 1'
  'set strsiz 0.1'
  'draw string 10.95 8.4 High Resolution Rapid Refresh (HRRR) 3km'
  'set strsiz 0.08'
  'draw string 10.95 8.2 Data from NCEP'
  'set strsiz 0.12'
  'set string 1 bl 1'
  'draw string 6.4 0.08 Forecast Valid: 'vhr':'vmin'z: 'vmonth' 'vday', 'vyr
  'set rgb 255 0 0 229'
  'set string 255'
  'set string 255 bl 1'
  'draw string 0.11 0.08 http://derecho.math.uwm.edu/~bmburlin/'
  'gxprint 'fhr'_'lev'_vv.png x800 y600'
  'clear'

    count = count + inc
    t = t + inc
    fhr = fhr + inc

  endwhile
*  '!mv *'lev'_vv.png /tstorm/s0/bmburlin/wrf/POST/NCEP/'model'/images/'lev'_vv'
  '!mv *'lev'_vv.png /tornado/r1/bmburlin/public_html/graphics/'model'/'lev'_vv'
*  **************************************************************************************
  wlev=wlev+1
endwhile
'quit'
