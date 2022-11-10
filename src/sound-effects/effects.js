import select from './select.mp3';
import tab from './tab.wav';
import unlock from './unlock.wav';
import click from './click.wav';
import timer from './bell-timer.wav';
import success from './success.wav';
import charSelect from './bonus.wav';


export const effects = {
    select: new Audio(select),
    tab: new Audio(tab),
    unlock: new Audio(unlock),
    click: new Audio(click),
    timer: new Audio(timer),
    success: new Audio(success),
    charSelect: new Audio(charSelect)
};