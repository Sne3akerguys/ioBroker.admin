/* This file is temporary here to speed-up the development of this component.
    Later it will be moved to adapter-react
 */

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import secondary from '@material-ui/core/colors/orange';
import Grid from '@material-ui/core/Grid';
import copy from 'copy-to-clipboard';
import Badge from '@material-ui/core/Badge';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Tooltip from '@material-ui/core/Tooltip';

// components
import ObjectCustomDialog from './ObjectCustomDialog';

// Icons
import {FaFolder as IconClosed} from 'react-icons/fa';
import {FaFolderOpen as IconOpen} from 'react-icons/fa';
import {FaFile as IconDocument} from 'react-icons/fa';
import {MdPerson as IconExpert} from 'react-icons/md';
import {FaCopy as IconCopy} from 'react-icons/fa';
import {FaEdit as IconEdit} from 'react-icons/fa';
import {FaTrash as IconDelete} from 'react-icons/fa';
import {FaWrench as IconConfig} from 'react-icons/fa';
import IconState from '../assets/state.png';
import IconChannel from '../assets/channel.png';
import IconDevice from '../assets/device.png';
import {FaCogs as IconSystem} from 'react-icons/fa';
import {FaPhotoVideo as IconPhoto} from 'react-icons/fa';
import {FaLightbulb as IconAlias} from 'react-icons/fa';
import {FaUserFriends as IconGroup} from 'react-icons/fa';
import {FaUser as IconUser} from 'react-icons/fa';
import {FaDigitalTachograph as IconHost} from 'react-icons/fa';
import {FaWifi as IconConnection} from 'react-icons/fa';
import {FaInfoCircle as IconInfo} from 'react-icons/fa';
import {FaFileCode as IconMeta} from 'react-icons/fa';

import UtilsAdapter from '@iobroker/adapter-react/Components/Utils';
import Utils from '../Utils';

import CopyContentIcon from './CopyIcon';

const ROW_HEIGHT = 32;
const ITEM_LEVEL = ROW_HEIGHT;
const SMALL_BUTTON_SIZE = 20;

const styles = theme => ({
    toolbar: {
        minHeight: 38,//Theme.toolbar.height,
//        boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)'
    },
    toolbarButtons: {
        padding: 4,
        marginLeft: 4
    },
    /*treeTable: {
        background: '#ffffff',
        borderTop: '1px solid #999',
        borderBottom: '1px solid #999'
    },
    treeTableDark: {
        background: 'inherit',
        borderTop: '1px solid #999',
        borderBottom: '1px solid #999'
    },
    treeTableRow: {
        boxShadow: 'inset 0 1px 0 #eeeeee',
        display: 'block'
    },
     */

    mainDiv: {
        height: '100%',
        overflow: 'hidden',
        flexWrap: 'nowrap'
    },
    headerRow: {
        paddingLeft: theme.spacing(1),
        height: 38,
    },

    tableDiv: {
        paddingTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
        width: 'calc(100% - ' + theme.spacing(1) + 'px)',
        height: 'calc(100% - ' + 38 + 'px)',
        overflow: 'auto'
    },
    tableRow: {
        height: ROW_HEIGHT,
        lineHeight: ROW_HEIGHT + 'px',
        verticalAlign: 'top',
        userSelect: 'none',
        cursor: 'pointer',
        width: '100%',
        '&:hover': {
            background: theme.palette.primary.main,
            color: Utils.invertColor(theme.palette.primary.main, true),
        },
    },
    cellId: {
        display: 'inline-block',
        fontSize: '1rem',
        verticalAlign: 'top',
        position: 'relative',
        '& .copyButton': {
            display: 'none'
        },
        '&:hover .copyButton': {
            display: 'block'
        },
        '& .iconOwn': {
            display: 'block',
            width:  ROW_HEIGHT - 4,
            height: ROW_HEIGHT - 4,
            marginTop: 2,
            float: 'right',
        },
        '&:hover .iconOwn': {
            display: 'none'
        },
    },
    cellIdSpan: {
        display: 'inline-block',
        verticalAlign: 'top',
    },
    cellIdIconFolder: {
        marginRight: theme.spacing(1),
        width:  ROW_HEIGHT - 4,
        height: ROW_HEIGHT - 4,
        cursor: 'pointer',
        color: theme.palette.secondary.main || '#fbff7d',
    },
    cellIdIconDocument: {
        verticalAlign: 'middle',
        marginLeft: (ROW_HEIGHT - SMALL_BUTTON_SIZE) / 2,
        marginRight: theme.spacing(1),
        width:  SMALL_BUTTON_SIZE,
        height: SMALL_BUTTON_SIZE,
    },
    cellIdIconOwn: {

    },
    cellCopyButton: {
        color: 'white',
        width: SMALL_BUTTON_SIZE,
        height: SMALL_BUTTON_SIZE,
        position: 'absolute',
        top: (ROW_HEIGHT - SMALL_BUTTON_SIZE) / 2,
        right: 0,
        opacity: 0.7,
        '&:hover': {
            opacity: 1,
        },
    },
    cellEditButton: {
        width: SMALL_BUTTON_SIZE,
        height: SMALL_BUTTON_SIZE,
        color: 'white',
        position: 'absolute',
        top: (ROW_HEIGHT - SMALL_BUTTON_SIZE) / 2,
        right: SMALL_BUTTON_SIZE + 3,
        opacity: 0.7,
        '&:hover': {
            opacity: 1,
        },
    },
    cellName : {
        display: 'inline-block',
        verticalAlign: 'top',
    },
    cellType: {
        display: 'inline-block',
        verticalAlign: 'top',
        '& .itemIcon': {
            verticalAlign: 'middle',
            width: 24,
            height: 24,
            display: 'inline-block',
        },
    },
    cellRole : {
        display: 'inline-block',
        verticalAlign: 'top',
    },
    cellRoom : {
        display: 'inline-block',
        verticalAlign: 'top',
    },
    cellFunc : {
        display: 'inline-block',
        verticalAlign: 'top',
    },
    cellValue : {
        display: 'inline-block',
        verticalAlign: 'top'
    },
    cellValueTooltip: {
        width: '100%',
    },
    cellValueText: {
        width: '100%',
        height: ROW_HEIGHT,
        display: 'inline-block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        position: 'relative',
        verticalAlign: 'top',
        '& .copyButton': {
            display: 'none'
        },
        '&:hover .copyButton': {
            display: 'block'
        }
    },
    cellValueTooltipTitle: {
        fontStyle: 'italic',
        width: 80,
        display: 'inline-block',
    },
    cellValueTooltipValue: {
        width: 120,
        display: 'inline-block',
        //overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    cellValueTextUnit: {
        opacity: 0.8,
    },
    cellValueTextState: {
        opacity: 0.7,
    },
    cellValueTooltipCopy: {
        position: 'absolute',
        bottom: 3,
        right: 3,
    },
    cellValueTooltipEdit: {
        position: 'absolute',
        bottom: 3,
        right: 15,
    },
    cellButtons: {
        display: 'inline-block',
        verticalAlign: 'top',
    },
    cellButtonsButton: {
        display: 'inline-block',
        opacity: 0.7,
        width:  SMALL_BUTTON_SIZE + 4,
        height: SMALL_BUTTON_SIZE + 4,
        '&:hover': {
            opacity: 1,
        }
    },
    cellButtonsButtonAlone: {
        marginLeft: SMALL_BUTTON_SIZE + 4,
    },

    filteredOut: {
        opacity: 0.3
    },
    selectIcon: {
        width: 16,
        height: 16,
        paddingRight: 5
    },
    selectNone: {
        opacity: 0.5,
    },
    /*cellDiv: {
        display: 'inline-block',
        fontSize: 12,
        height: 26,
        verticalAlign: 'top'
    },
    cellDivId: {
        display: 'inline-block',
        height: 26,
        verticalAlign: 'top'
    },
    cellWrapper: {
        display: 'flex',
        alignItems: 'center',
        fontWeight: 300,
        fontSize: 13,
        height: '100%',
        width: '100%',
//        fontFamily: "'SF Mono', 'Segoe UI Mono', 'Roboto Mono', Menlo, Courier, monospace",
        lineHeight: '1em'
    },

    cellWrapperElement: {
        flexGrow: 1,
        cursor: 'default'
    },

    toggleButtonWrapper: {
        width: 16,
        flexGrow: 0,
        color: '#008fff',
        cursor: 'pointer',
        padding: 1,
        borderRadius: 3
    },


    partlyVisible: {
        opacity: 0.3
    },*/
    /*.toggle-button-wrapper > span:hover {
        background: #d7d7d7;
    }*/

    /*selectSpan: {
//        fontFamily: "'SF Mono', 'Segoe UI Mono', 'Roboto Mono', Menlo, Courier, monospace",
        background: '#efefef',
        border: '1px solid #e5e5e5',
        padding: 2,
        borderRadius: 3
    },
    selected: {
        background: '#008fff',
        color: 'white'
    },
    icon: {
        width: 20,
        height: 20,
        paddingTop: 2,
        paddingRight: 2
    },
    */
    itemSelected: {
        background: theme.palette.primary.main,
        color: Utils.invertColor(theme.palette.primary.main, true),
    },
    header: {
        width: '100%'
    },
    headerCell: {
        display: 'inline-block',
        verticalAlign: 'top',
    },
    headerCellValue: {
        paddingTop: 8,
        paddingLeft: 4,
    },
    headerCellInput: {
        width: 'calc(100% - 5px)',
        height: ROW_HEIGHT,
        paddingTop: 3,
        '& .itemIcon': {
            verticalAlign: 'middle',
            width: 24,
            height: 24,
            display: 'inline-block',
        }
    },
    headerCellSelectItem: {
        '& .itemIcon': {
            width: 24,
            height: 24,
            marginRight: 5,
            display: 'inline-block'
        }
    },
    visibleButtons: {
        color: '#2196f3',
        opacity: 0.7
    },
});

// d=data, t=target, s=start, e=end, m=middle
function binarySearch(list, find, _start, _end) {
    _start = _start || 0;
    if (_end === undefined) {
        _end = list.length - 1;
        if (!_end) {
            return list[0] === find;
        }
    }
    const middle = Math.floor((_start + _end) / 2);
    if (find === list[middle]) {
        return list[middle];
    }
    if (_end - 1 === _start) {
        return list[_start] === find || list[_end] === find;
    }
    if (find > list[middle]) {
        return binarySearch(list, find, middle, _end);
    }
    if (find < list[middle]) {
        return binarySearch(list, find, _start, middle);
    }
}

function applyFilter(item, filters, lang, objects, context, counter) {
    let filteredOut = false;
    if (!context) {
        context = {};
        if (filters.id) {
            context.id = filters.id.toLowerCase();
        }
        if (filters.name) {
            context.name = filters.name.toLowerCase();
        }
        if (filters.type) {
            context.type = filters.type.toLowerCase();
        }
        if (filters.customs) {
            context.customs = filters.customs.toLowerCase();
        }
        if (filters.role) {
            context.role = filters.role.toLowerCase();
        }
        if (filters.room) {
            context.room = (objects[filters.room] && objects[filters.room].common && objects[filters.room].common.members) || [];
        }
        if (filters.func) {
            context.func = (objects[filters.func] && objects[filters.func].common && objects[filters.func].common.members) || [];
        }
    }

    const data = item.data;

    if (data && data.id) {
        const common = data.obj && data.obj.common;

        if (!filters.expertMode) {
            filteredOut =
                data.id === 'system' ||
                data.id === 'enum' ||
               // (data.obj && data.obj.type === 'meta') ||
                data.id.startsWith('system.') ||
                data.id.startsWith('enum.') ||
                data.id.startsWith('_design/') ||
                (common && common.expertMode);
        }
        if (!filteredOut && context.id) {
            if (data.fID === undefined) {
                data.fID = data.id.toLowerCase();
            }
            filteredOut = data.fID.indexOf(context.id) === -1;
        }
        if (!filteredOut && context.name && common) {
            if (data.fName === undefined) {
                data.fName = (common && getName(common.name, lang)) || '';
                data.fName = data.fName.toLowerCase();
            }
            filteredOut = !data.fName.includes(context.name);
        }
        if (!filteredOut && filters.role && common) {
            filteredOut = !(common.role && common.role.startsWith(context.role));
        }
        if (!filteredOut && context.room) {
            filteredOut = !context.room.find(id => id === data.id || data.id.startsWith(id + '.'));
        }
        if (!filteredOut && context.func) {
            filteredOut = !context.func.find(id => id === data.id || data.id.startsWith(id + '.'));
        }
        if (!filteredOut && context.type) {
            filteredOut = !(data.obj && data.obj.type && data.obj.type === context.role);
        }
        if (!filteredOut && context.customs && common) {
            filteredOut = !common.customs || !common.customs[context.customs];
        }
    }
    data.visible = !filteredOut;
    data.hasVisibleChildren = false;
    if (item.children) {
        item.children.forEach(_item => {
            const visible = applyFilter(_item, filters, lang, objects, context, counter);
            if (visible) {
                data.hasVisibleChildren = true;
            }
        });
    }

    const visible = data.visible || data.hasVisibleChildren;
    if (counter && visible) {
        counter.count++;
    }

    return visible;
}

function getSystemIcon(objects, id, k) {
    let icon;

    // system or design have special icons
    if (id.startsWith('_design/') || (id === 'system')) {
        icon = <IconSystem className="iconOwn" />;
    } else if (id === '0_userdata' || id === '0_userdata.0') {
        icon = <IconPhoto className="iconOwn" />;
    } else if (id === 'alias' || id === 'alias.0') {
        icon = <IconAlias className="iconOwn" />;
    } else if (id === 'system.adapter') {
        icon = <IconSystem className="iconOwn" />;
    } else if (id === 'system.group') {
        icon = <IconGroup className="iconOwn" />;
    } else if (id === 'system.user') {
        icon = <IconUser className="iconOwn" />;
    } else if (id === 'system.host') {
        icon = <IconHost className="iconOwn" />;
    } else if (id.endsWith('.connection') || id.endsWith('.connected')) {
        icon = <IconConnection className="iconOwn" />;
    } else if (id.endsWith('.info')) {
        icon = <IconInfo className="iconOwn" />;
    } else if (objects[id] && objects[id].type === 'meta') {
        icon = <IconMeta className="iconOwn" />;
    } else if (k < 2) {
        // detect "cloud.0"
        if (objects['system.adapter.' + id]) {
            icon = getSelectIdIcon(objects, 'system.adapter.' + id, '.');
        }
    }

    return icon || null;
}

function buildTree(objects, options) {
    options = options || {};

    const ids = Object.keys(objects);

    ids.sort((a, b) => {
        if (a === b) return 0;
        a = a.replace(/\./g, '!!!');
        b = b.replace(/\./g, '!!!');
        if (a > b) return 1;
        return -1;
    });

    // find empty nodes and create names for it
    let currentPathArr = [];
    let currentPath = '';
    let currentPathLen = 0;
    let root = {
        data: {
            name: '',
            id: ''
        },
        children: []
    };

    let info = {
        funcEnums: [],
        roomEnums: [],
        roles:     [],
        ids:       [],
        types:     [],
        objects,
        customs:   [],
        hasSomeCustoms: false,
    };

    let croot = root;
    for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        const obj = objects[id];
        const parts = id.split('.');

        if (obj.type && !info.types.includes(obj.type)) {
            info.types.push(obj.type);
        }

        if (id.startsWith('alias')) {
            console.log(id);
        }

        if (obj) {
            const common = obj.common;
            const role = common && common.role;
            if (role && !info.roles.includes(role)) {
                info.roles.push(role);
            } else if (id.startsWith('enum.rooms.')) {
                info.roomEnums.push(id);
            } else if (id.startsWith('enum.functions.')) {
                info.funcEnums.push(id);
            } else if (obj.type === 'instance' && common && common.supportCustoms) {
                info.hasSomeCustoms = true;
                info.customs.push(id.substring('system.adapter.'.length));
            }
        }

        if (options.statesOnly && (!obj || obj.type !== 'state')) {
            continue;
        }

        info.ids.push(id);

        let repeat;

        // if next level
        do {
            repeat = false;

            // If current level is still OK and we can add ID to children
            if (!currentPath || id.startsWith(currentPath + '.')) {
                // if more than one level added
                if (parts.length - currentPathLen > 1) {
                    let curPath = currentPath;
                    // generate missing levels
                    for (let k = currentPathLen; k < parts.length - 1; k++) {
                        curPath += (curPath ? '.' : '') + parts[k];
                        // level does not exist
                        if (!binarySearch(info.ids, curPath)) {

                            const _croot = {
                                data: {
                                    name:   parts[k],
                                    parent: croot,
                                    id:     curPath,
                                    obj:    objects[curPath],
                                    level:  k,
                                    icon:   getSystemIcon(objects, curPath, k),
                                    generated: true,
                                }
                            };

                            croot.children = croot.children || [];
                            croot.children.push(_croot);
                            croot = _croot;
                            info.ids.push(curPath); // IDs will be added by alphabet
                        } else {
                            croot = croot.children.find(item => item.data.name === parts[k]);
                        }
                    }
                }

                const _croot = {
                    data: {
                        name:   parts[parts.length - 1],
                        title:  getName(obj, options.lang),
                        obj:    obj,
                        parent: croot,
                        icon:   getSelectIdIcon(objects, id, '.') || getSystemIcon(objects, id, 0),
                        id,
                        level:  parts.length - 1,
                        generated: false,
                    }
                };

                croot.children = croot.children || [];
                croot.children.push(_croot);
                croot = _croot;

                currentPathLen = parts.length;
                currentPathArr = parts;
                currentPath    = id;
            } else {
                let u = 0;

                while (currentPathArr[u] === parts[u]) {
                    u++;
                }

                if (u > 0) {
                    let move = currentPathArr.length;
                    currentPathArr = currentPathArr.splice(0, u);
                    currentPathLen = u;
                    currentPath = currentPathArr.join('.');
                    while (move > u) {
                        croot = croot.data.parent;
                        move--;
                    }
                } else {
                    croot = root;
                    currentPathArr = [];
                    currentPath    = '';
                    currentPathLen = 0;
                }
                repeat = true;
            }
        } while (repeat);
    }

    info.roomEnums.sort();
    info.funcEnums.sort();
    info.roles.sort();
    info.types.sort();

    return {info, root};
}

function findNode(root, id, _parts, _path, _level) {
    if (root.data.id === id) {
        return root;
    }
    if (!_parts) {
        _parts = id.split('.');
        _level = 0;
        _path = _parts[_level];
    }
    if (!root.children && root.data.id !== id) {
        return null;
    } else {
        let found;
        for (let i = 0; i < root.children.length; i++) {
            const _id = root.children[i].data.id;
            if (_id === _path) {
                found = root.children[i];
                break;
            } else
            if (_id < _path) continue;
            if (_id > _path) break;
        }
        if (found) {
            return findNode(found, id, _parts, _path + '.' + _parts[_level + 1], _level + 1);
        } else {
            return null;
        }
    }
}

function getName(name, lang) {
    if (name && typeof name === 'object') {
        return name[lang] || name.en;
    } else {
        return name || '';
    }
}

function findRoomsForObject(data, id, lang, withParentInfo, rooms) {
    if (!id) {
        return [];
    }
    rooms = rooms || [];
    for (let i = 0; i < data.roomEnums.length; i++) {
        const common = data.objects[data.roomEnums[i]] && data.objects[data.roomEnums[i]].common;
        const name = getName(common.name, lang);

        if (common.members && common.members.indexOf(id) !== -1 && rooms.indexOf(name) === -1) {
            if (!withParentInfo) {
                rooms.push(name);
            } else {
                rooms.push({ name: name, origin: id });
            }
        }
    }
    const parts = id.split('.');
    parts.pop();
    id = parts.join('.');
    if (data.objects[id]) {
        findRoomsForObject(data, id, lang, withParentInfo, rooms);
    }

    return rooms;
}

/* function findRoomsForObjectAsIds(data, id, rooms) {
    if (!id) {
        return [];
    }
    rooms = rooms || [];
    for (let i = 0; i < data.roomEnums.length; i++) {
        const common = data.objects[data.roomEnums[i]] && data.objects[data.roomEnums[i]].common;
        if (common && common.members && common.members.indexOf(id) !== -1 &&
            rooms.indexOf(data.roomEnums[i]) === -1) {
            rooms.push(data.roomEnums[i]);
        }
    }
    return rooms;
}
*/
function findFunctionsForObject(data, id, lang, withParentInfo, funcs) {
    if (!id) {
        return [];
    }
    funcs = funcs || [];
    for (let i = 0; i < data.funcEnums.length; i++) {
        const common = data.objects[data.funcEnums[i]] && data.objects[data.funcEnums[i]].common;
        const name = getName(common.name, lang);
        if (common && common.members && common.members.indexOf(id) !== -1 && funcs.indexOf(name) === -1) {
            if (!withParentInfo) {
                funcs.push(name);
            } else {
                funcs.push({name: name, origin: id});
            }
        }
    }
    const parts = id.split('.');
    parts.pop();
    id = parts.join('.');
    if (data.objects[id]) {
        findFunctionsForObject(data, id, lang, withParentInfo, funcs);
    }

    return funcs;
}

/*function findFunctionsForObjectAsIds(data, id, funcs) {
    if (!id) {
        return [];
    }
    funcs = funcs || [];
    for (let i = 0; i < data.funcEnums.length; i++) {
        const common = data.objects[data.funcEnums[i]] && data.objects[data.funcEnums[i]].common;
        if (common && common.members && common.members.indexOf(id) !== -1 &&
            funcs.indexOf(data.funcEnums[i]) === -1) {
            funcs.push(data.funcEnums[i]);
        }
    }

    return funcs;
}
*/
function getStates(obj) {
    let states;
    if (obj &&
        obj.common &&
        obj.common.states) {
        states = obj.common.states;
    }
    if (states) {
        if (typeof states === 'string' && states[0] === '{') {
            try {
                states = JSON.parse(states);
            } catch (ex) {
                console.error('Cannot parse states: ' + states);
                states = null;
            }
        } else
            // if old format val1:text1;val2:text2
        if (typeof states === 'string') {
            const parts = states.split(';');
            states = {};
            for (let p = 0; p < parts.length; p++) {
                const s = parts[p].split(':');
                states[s[0]] = s[1];
            }
        }
    }
    return states;
}

function quality2text(q) {
    if (!q) return 'ok';
    const custom = q & 0xFFFF0000;
    let text = '';
    if (q & 0x40) text += 'device';
    if (q & 0x80) text += 'sensor';
    if (q & 0x01) text += ' bad';
    if (q & 0x02) text += ' not connected';
    if (q & 0x04) text += ' error';

    return text + (custom ? '|0x' + (custom >> 16).toString(16).toUpperCase() : '') + ' [0x' + q.toString(16).toUpperCase() + ']';
}

function formatDate(dateObj) {
    //return dateObj.getFullYear() + '-' +
    //    ('0' + (dateObj.getMonth() + 1).toString(10)).slice(-2) + '-' +
    //    ('0' + (dateObj.getDate()).toString(10)).slice(-2) + ' ' +
    //    ('0' + (dateObj.getHours()).toString(10)).slice(-2) + ':' +
    //    ('0' + (dateObj.getMinutes()).toString(10)).slice(-2) + ':' +
    //    ('0' + (dateObj.getSeconds()).toString(10)).slice(-2);
    // Following implementation is 5 times faster
    if (!dateObj) return '';

    let text = dateObj.getFullYear();
    let v = dateObj.getMonth() + 1;
    if (v < 10) {
        text += '-0' + v;
    } else {
        text += '-' + v;
    }

    v = dateObj.getDate();
    if (v < 10) {
        text += '-0' + v;
    } else {
        text += '-' + v;
    }

    v = dateObj.getHours();
    if (v < 10) {
        text += ' 0' + v;
    } else {
        text += ' ' + v;
    }
    v = dateObj.getMinutes();
    if (v < 10) {
        text += ':0' + v;
    } else {
        text += ':' + v;
    }

    v = dateObj.getSeconds();
    if (v < 10) {
        text += ':0' + v;
    } else {
        text += ':' + v;
    }

    v = dateObj.getMilliseconds();
    if (v < 10) {
        text += '.00' + v;
    } else if (v < 100) {
        text += '.0' + v;
    } else {
        text += '.' + v;
    }

    return text;
}

function formatValue(id, state, obj, texts) {
    const states = getStates(obj);
    const isCommon = obj.common;

    const valText = {};
    let v = !state || state.val === null ? '(null)' : (state.val === undefined ? '[undef]' : state.val);
    const type = typeof v;
    if (type === 'number') {
        v = (Math.round(v * 100000000) / 100000000); // remove 4.00000000000000001
    } else if (type === 'object') {
        v = JSON.stringify(v);
    } else if (type !== 'string') {
        v = v.toString();
    }

    if (isCommon && isCommon.role && typeof isCommon.role === 'string' && isCommon.role.match(/^value\.time|^date/)) {
        v = v ? new Date(v).toString() : v;
    } else if (typeof v !== 'string') {
        v = v.toString();
    }

    if (states && states[v] !== undefined) {
        valText.s = v;
        v = states[valText.s];
    }

    let valFull;
    if (isCommon && isCommon.unit) {
        valText.u = isCommon.unit;
    }
    valFull = [{t: texts.value, v}];

    if (state) {
        if (state.ack !== undefined) {
            valFull.push({t: texts.ack, v: state.ack.toString()});
        }
        if (state.ts) {
            valFull.push({t: texts.ts, v: state.ts ? formatDate(new Date(state.ts)) : ''});
        }
        if (state.lc) {
            valFull.push({t: texts.lc, v: state.lc ? formatDate(new Date(state.lc)) : ''});
        }
        if (state.from) {
            valFull.push({t: texts.from, v: state.from || ''});
        }
        if (state.user) {
            valFull.push({t: texts.user, v: state.user || ''});
        }
        valFull.push({t: texts.quality, v: quality2text(state.q || 0), nbr: true});
    }

    if (typeof v === 'string' && v) {
        v = v.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }

    valText.v = v;

    return {
        valText,
        valFull,
        style: { color: state.ack ? (state.q ? 'orange' : '') : '#c00000' }
    };
}

function getSelectIdIcon(objects, id, prefix) {
    prefix = prefix || '.';//http://localhost:8081';
    let src = '';
    const _id_ = 'system.adapter.' + id;
    const aIcon = id && objects[_id_] && objects[_id_].common && objects[_id_].common.icon;
    if (aIcon) {
        // if not BASE64
        if (!aIcon.startsWith('data:image/')) {
            if (aIcon.includes('.')) {
                src = prefix + '/adapter/' + objects[_id_].common.name + '/' + aIcon;
            } else {
                return null; //'<i class="material-icons iob-list-icon">' + objects[_id_].common.icon + '</i>';
            }
        } else {
            src = aIcon;
        }
    } else {
        const common = objects[id] && objects[id].common;

        if (common) {
            const cIcon = common.icon;
            if (cIcon) {
                if (!cIcon.startsWith('data:image/')) {
                    if (cIcon.includes('.')) {
                        let instance;
                        if (objects[id].type === 'instance' || objects[id].type === 'adapter') {
                            src = prefix + '/adapter/' + common.name + '/' + cIcon;
                        } else if (id && id.startsWith('system.adapter.')) {
                            instance = id.split('.', 3);
                            if (cIcon[0] === '/') {
                                instance[2] += cIcon;
                            } else {
                                instance[2] += '/' + cIcon;
                            }
                            src = prefix + '/adapter/' + instance[2];
                        } else {
                            instance = id.split('.', 2);
                            if (cIcon[0] === '/') {
                                instance[0] += cIcon;
                            } else {
                                instance[0] += '/' + cIcon;
                            }
                            src = prefix + '/adapter/' + instance[0];
                        }
                    } else {
                        return null;
                    }
                } else {
                    // base 64 image
                    src = cIcon;
                }
            }
        }
    }

    return src || null;
}

const DEFAULT_FILTER = {
    id:     '',
    name:   '',
    room:   '',
    func:   '',
    role:   '',
    expertMode: false
};

const ITEM_IMAGES = {
    state: <img className="itemIcon" src={ IconState } alt="state" />,
    channel: <img className="itemIcon" src={ IconChannel } alt="state" />,
    device: <img className="itemIcon" src={ IconDevice } alt="state" />,
    adapter: null,
    meta: null,
    instance: null,
    enum: null,
    chart: null,
    config: null,
    group: null,
    user: null,
    host: null,
    schedule: null,
    script: null,
};

const StyledBadge = withStyles((theme) => ({
    badge: {
        right: 3,
        top: 3,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}))(Badge);

class ObjectBrowser extends React.Component {
    constructor(props) {
        super(props);

        let expanded = window.localStorage.getItem((this.props.key || 'App') + '.objectExpanded') || '[]';
        try {
            expanded = JSON.parse(expanded);
        } catch (e) {
            expanded = [];
        }

        let filter =
            this.props.defaultFilters ||
            window.localStorage.getItem(this.props.key || 'App.objectFilter') ||
            Object.assign({}, DEFAULT_FILTER);

        if (typeof filter === 'string') {
            try {
                filter = JSON.parse(filter);
            } catch (e) {
                filter = Object.assign({}, DEFAULT_FILTER);
            }
        }
        filter.expertMode =  this.props.expertMode || false;

        this.state = {
            loaded: false,
            selected: (this.props.selected || '').replace(/["']/g, ''),
            filter,
            depth: 0,
            expandAllVisible: false,
            expanded,
            toast: '',
            lang: this.props.lang,
            scrollBarWidth: 16,
            hasSomeCustoms: false,
        };

        this.tableRef  = React.createRef();
        this.filterRefs = {};
        Object.keys(DEFAULT_FILTER).forEach(name =>
            this.filterRefs[name] = React.createRef());

        this.lastAppliedFilter = null;

        this.selectedFound = false;
        this.copyContentImg = CopyContentIcon;
        this.treeTableRef = React.createRef();
        this.mainRef = React.createRef();
        this.root = null;
        this.states = {};
        this.subscribes = [];
        this.statesUpdateTimer = null;
        this.objectsUpdateTimer = null;

        this.onObjectChangeBound = this.onObjectChange.bind(this);

        this.visibleCols = this.props.cols || ['name', 'type', 'role', 'room', 'func', 'val', 'buttons'];

        this.texts = {
            value:        this.props.t('tooltip_value'),
            ack:          this.props.t('tooltip_ack'),
            ts:           this.props.t('tooltip_ts'),
            lc:           this.props.t('tooltip_lc'),
            from:         this.props.t('tooltip_from'),
            user:         this.props.t('tooltip_user'),
            quality:      this.props.t('tooltip_quality'),
            editObject:   this.props.t('tooltip_editObject'),
            deleteObject: this.props.t('tooltip_deleteObject'),
            customConfig: this.props.t('tooltip_customConfig'),
            copyState:    this.props.t('tooltip_copyState'),
            editState:    this.props.t('tooltip_editState'),
        };

        this.onStateChangeBound = this.onStateChange.bind(this);

        this.props.socket.getObjects(true)
            .then(objects => {
                this.objects = objects;
                const {info, root} = buildTree(this.objects, this.props);
                this.root = root;
                this.info = info;

                let node = this.state.selected && findNode(this.root, this.state.selected);

                // If selected ID is not visible, reset filter
                if (node && !applyFilter(node, this.state.filter, this.state.lang, this.objects)) {
                    // reset filter
                    this.setState({ filter: Object.assign({}, DEFAULT_FILTER) }, () => {
                        this.setState({ loaded: true });
                        this.state.selected && this.onSelect(this.state.selected);
                    });
                } else {
                    this.setState({ loaded: true });

                    this.state.selected && this.onSelect(this.state.selected);
                }
            });
    }

    static getDerivedStateFromProps(props, state) {
        const newState = {};
        let changed = false;
        if (props.expertMode !== state.filter.expertMode) {
            changed = true;
            newState.filter = Object.assign({}, state.filter);
            newState.filter.expertMode = props.expertMode;
        }
        return changed ? newState : null;
    }

    componentDidMount() {
        this.props.socket.subscribeObject('*', this.onObjectChangeBound);
    }

    componentWillUnmount() {
        this.props.socket.unsubscribeObject('*', this.onObjectChangeBound);

        // remove all subscribes
        this.subscribes.forEach(pattern => {
            console.log('- unsubscribe ' + pattern);
            this.props.socket.unsubscribeState(pattern, this.onStateChangeBound);
        });

        this.subscribes = [];
    }

    onSelect(selected, isDouble) {
        selected !== this.state.selected && this.setState({selected});
        const name = selected ? UtilsAdapter.getObjectName(this.objects, selected, null, { language: this.state.lang }) : '';
        this.props.onSelect && this.props.onSelect(selected, name, isDouble);
    }

    onDoubleClick(data, metadata, toggleChildren) {
        if (metadata.hasChildren) {
            toggleChildren();
        } else if (data.obj && data.obj.type === 'state') {
            this.onSelect(data.obj._id, true);
        }
    }

    checkUnsubscribes() {
        // Remove unused subscribed
        for (let i = this.subscribes.length - 1; i >= 0; i--) {
            !this.recordStates.includes(this.subscribes[i]) &&
                this.unsubscribe(this.subscribes[i]);
        }
        this.recordStates = [];
    }

    onStateChange(id, state) {
        this.states[id] = state;
        console.log('+ subscribe ' + id);

        if (!this.statesUpdateTimer) {
            this.statesUpdateTimer = setTimeout(() => {
                this.statesUpdateTimer = null;
                this.forceUpdate();
            }, 300);
        }
    }

    onObjectChange(id, obj, oldObj) {
        console.log('+ subscribe ' + id);

        if (this.objects[id]) {
            if (obj) {
                this.objects[id] = obj;
            } else {
                delete this.objects[id];
            }
        } else if (this.objects[id]) {
            delete this.objects[id];
        }

        if (!this.objectsUpdateTimer) {
            this.objectsUpdateTimer = setTimeout(() => {
                this.objectsUpdateTimer = null;
                const { info, root } = buildTree(this.objects, this.props);
                this.root = root;
                this.info = info;
                this.lastAppliedFilter = null; // apply filter anew

                this.forceUpdate();
            }, 500);
        }
    }

    subscribe(id) {
        if (this.subscribes.indexOf(id) === -1) {
            this.subscribes.push(id);
            this.props.socket.subscribeState(id, this.onStateChangeBound);
        }
    }

    unsubscribe(id) {
        const pos = this.subscribes.indexOf(id);
        if (pos !== -1) {
            this.subscribes.splice(pos, 1);
            if (this.states[id]) {
                delete this.states[id];
            }
            console.log('- unsubscribe ' + id);
            this.props.socket.unsubscribeState(id, this.onStateChangeBound);
        }
    }

    onFilter(name, value) {
        this.filterTimer = null;
        let filter = {};

        Object.keys(this.filterRefs).forEach(name => {
            if (this.filterRefs[name] && this.filterRefs[name].current) {
                for (var i = 0; i < this.filterRefs[name].current.childNodes.length; i++) {
                    if (this.filterRefs[name].current.childNodes[i].tagName === 'INPUT') {
                        filter[name] =this.filterRefs[name].current.childNodes[i].value;
                        break;
                    }
                }
            }
        });

        filter = Object.assign({}, this.state.filter, filter);

        if (JSON.stringify(this.state.filter) !== JSON.stringify(filter)) {
            this.setState({ filter} );
        }
    }

    getFilterInput(name) {
        return (<FormControl className={ this.props.classes.headerCellInput } style={{ marginTop: 0, marginBottom: 0 }} margin="dense">
            <Input
                ref={ this.filterRefs[name] }
                classes={{ underline: 'no-underline' }}
                id={ name }
                placeholder={this.props.t('filter_' + name)}
                defaultValue={ this.state.filter[name] }
                onChange={e => {
                    this.filterTimer && clearTimeout(this.filterTimer);
                    this.filterTimer = setTimeout(() => this.onFilter(), 400);
                }}
                autoComplete="off"
            />
        </FormControl>);
    }

    getFilterSelect(name, values) {
        const hasIcons = !!values.find(item => item.icon);

        return <Select
            ref={ this.filterRefs[name] }
            className={ this.props.classes.headerCellInput + ' no-underline' }
            onChange={e => {
                this.filterTimer && clearTimeout(this.filterTimer);
                this.filterTimer = setTimeout(() => this.onFilter(), 400);
            }}
            defaultValue={ this.state.filter[name] || '' }
            inputProps={{ name, id: name }}
            displayEmpty={ true }
        >
            <MenuItem key="empty" value=""><span className={ this.props.classes.selectNone }>{this.props.t('filter_' + name)}</span></MenuItem>
            { values.map(item => {
                let id;
                let name;
                let icon;
                if (typeof item === 'object') {
                    id   = item.value;
                    name = item.name;
                    icon = item.icon;
                } else {
                    id   = item;
                    name = item;
                }

                return <MenuItem className={ this.props.classes.headerCellSelectItem } key={ id } value={ id }>
                        { icon ? icon : (hasIcons ? <div className="itemIcon"/> : null)}
                        { name }
                    </MenuItem>;
            }) }
        </Select>;
    }

    getFilterSelectRole() {
        return this.getFilterSelect('role', this.info.roles);
    }

    getFilterSelectRoom() {
        const rooms = this.info.roomEnums.map(id => {
            return {name: getName((this.objects[id] && this.objects[id].common && this.objects[id].common.name) || id.split('.').pop()), value: id};
        });

        return this.getFilterSelect('room', rooms);

    }

    getFilterSelectFunction() {
        const func = this.info.funcEnums.map(id =>
            ({name: getName((this.objects[id] && this.objects[id].common && this.objects[id].common.name) || id.split('.').pop()), value: id}));
        return this.getFilterSelect('func', func);

    }

    getFilterSelectType() {
        const types = this.info.types.map(type =>
            ({name: type, value: type, icon: ITEM_IMAGES[type]}));

        return this.getFilterSelect('type', types);
    }

    getFilterSelectCustoms() {
        if (this.info.customs.length) {
            return this.getFilterSelect('customs', this.info.customs);
        } else {
            return null;
        }
    }

    onExpandAll(root, expanded) {
        root = root || this.root;
        expanded = expanded || [];

        root.children && root.children.forEach(item => {
            if (item.hasVisibleChildren) {
                expanded.push(item.data.id);
                this.onExpandAll(item, expanded);
            }
        });

        if (root === this.root) {
            expanded.sort();
            window.localStorage.setItem((this.props.key || 'App') + '.objectExpanded', JSON.stringify(expanded));

            this.setState({ expanded });
        }
    }

    onCollapseAll() {
        window.localStorage.setItem((this.props.key || 'App') + '.objectExpanded', JSON.stringify([]));
        this.setState({ expanded: [], depth: 0 });
    }

    expandDepth(root, depth, expanded) {
        root = root || this.root;
        if (depth > 0) {
            if (root.children) {
                root.children.forEach(item => {
                    if (item.data.visible || item.data.hasVisibleChildren) {
                        if (!binarySearch(expanded, item.data.id)) {
                            expanded.push(item.data.id);
                            expanded.sort();
                        }
                        if (depth - 1 > 0) {
                            this.expandDepth(item, depth - 1, expanded);
                        }
                    }
                });
            }
        }
    }

    collapseDepth(depth, expanded) {
        return expanded.filter(id => id.split('.').length <= depth);
    }

    onExpandVisible() {
        if (this.state.depth < 9) {
            const depth = this.state.depth + 1;
            const expanded = [...this.state.expanded];
            this.expandDepth(this.root, depth, expanded);
            window.localStorage.setItem((this.props.key || 'App') + '.objectExpanded', JSON.stringify(expanded));
            this.setState({ depth, expanded });
        }
    }

    onCollapseVisible() {
        if (this.state.depth > 0) {
            const depth = this.state.depth - 1;
            const expanded = this.collapseDepth(depth, this.state.expanded);
            window.localStorage.setItem((this.props.key || 'App') + '.objectExpanded', JSON.stringify(expanded));
            this.setState({ depth, expanded });
        }
    }

    getToolbar() {
        return (
            <Toolbar variant="dense" className={this.props.classes.toolbar} key="toolbar">
                { this.props.showExpertButton ? <IconButton key="expertMode" variant="contained" className={this.props.classes.toolbarButtons} color={this.state.filter.expertMode ? 'secondary' : 'primary'} onClick={() => this.onFilter('expertMode', !this.state.filter.expertMode)}><IconExpert /></IconButton>: null }
                { this.state.expandAllVisible ? <IconButton key="expandAll"       variant="contained" className={ this.props.classes.toolbarButtons } onClick={() => this.onExpandAll()}><IconOpen /></IconButton> : null }
                <IconButton key="collapseAll"     variant="contained" className={ this.props.classes.toolbarButtons } onClick={() => this.onCollapseAll()}><IconClosed /></IconButton>
                <StyledBadge badgeContent={ this.state.depth } color="secondary">
                    <IconButton key="expandVisible"   variant="contained" className={ this.props.classes.toolbarButtons + ' ' + this.props.classes.visibleButtons} onClick={() => this.onExpandVisible()}><IconOpen /></IconButton>
                </StyledBadge>
                <StyledBadge badgeContent={ this.state.depth } color="secondary">
                    <IconButton key="collapseVisible" variant="contained" className={ this.props.classes.toolbarButtons + ' ' + this.props.classes.visibleButtons} onClick={() => this.onCollapseVisible()}><IconClosed /></IconButton>
                </StyledBadge>
            </Toolbar>);
    }

    toggleExpanded(id) {
        const expanded = JSON.parse(JSON.stringify(this.state.expanded));
        const pos = expanded.indexOf(id);
        if (pos === -1) {
            expanded.push(id);
            expanded.sort();
        } else {
            expanded.splice(pos, 1);
        }

        window.localStorage.setItem((this.props.key || 'App') + '.objectExpanded', JSON.stringify(expanded));

        this.setState({ expanded });
    }

    onCopy(e) {
        e.stopPropagation();
        e.preventDefault();
        const text = e.target.parentNode.dataset.copy || '';
        copy(text);
        if (text.length < 50) {
            this.setState({ toast: this.props.t('Copied %s', text) });
        } else {
            this.setState({ toast: this.props.t('Copied') });
        }
    }

    renderColumnButtons(id, item, classes) {
        if (!item.data.obj) {
            return <IconButton className={ clsx(classes.cellButtonsButton, classes.cellButtonsButtonAlone) }  size="small" aria-label="delete" title={ this.texts.deleteObject }>
                    <IconDelete className={ classes.cellButtonsButtonIcon }  />
                </IconButton>;
        }

        return [
            <IconButton key="edit" className={ classes.cellButtonsButton } size="small" aria-label="edit" title={ this.texts.editObject }>
                <IconEdit className={ classes.cellButtonsButtonIcon } />
            </IconButton>,
            <IconButton key="delete" className={ classes.cellButtonsButton }  size="small" aria-label="delete" title={ this.texts.deleteObject }>
                <IconDelete className={ classes.cellButtonsButtonIcon }  />
            </IconButton>,
            this.info.hasSomeCustoms && item.data.obj.type === 'state' ? <IconButton
                key="custom"
                className={ classes.cellButtonsButton }
                size="small"
                aria-label="config"
                title={ this.texts.customConfig }
                onClick={ () => this.setState({ customDialog: [id]})}
            >
                <IconConfig className={ classes.cellButtonsButtonIcon }  />
            </IconButton> : null,
        ];
    }

    renderColumnValue(id, item, classes) {
        if (!item.data.obj || !this.states) {
            return null;
        }

        if (!this.states[id]) {
            if (item.data.obj.type === 'state') {
                this.recordStates.push(id);
                this.states[id] = { val: null };
                this.subscribe(id);
            }
            return null;
        } else {
            this.recordStates.push(id);
        }

        const state = this.states[id];
        let info = item.data.state;
        if (!info) {
            info = item.data.state = item.data.state || formatValue(id, state, item.data.obj, this.texts);

            info.valFull = info.valFull.map(item => [
                <div className={ classes.cellValueTooltipTitle } key={ item.t }>{ item.t }:</div>,
                <div className={ classes.cellValueTooltipValue } key={ item.t + '_v' }>{ item.v }</div>,
                !item.nbr ? <br key={ item.t + '_br' }/> : null]);

            /*
            info.valFull.push(<IconCopy className={ classes.cellValueTooltipCopy }  key="cc" />);
            info.valFull.push(<IconEdit className={ classes.cellValueTooltipEdit }  key="ce" />);
            */

            info.val = info.valText.v || '';

            info.valText = [
                <span key="valText">{ info.valText.v.toString() }</span>,
                info.valText.u ? <span className={ classes.cellValueTextUnit } key="unit">{ info.valText.u }</span> : null,
                info.valText.s !== undefined ? <span  className={ classes.cellValueTextState } key="states">({ info.valText.s })</span> : null,
            ];
        }

        return <Tooltip title={ info.valFull } >
            <div style={ info.style } className={ classes.cellValueText }>{ info.valText }
                <IconCopy className={ clsx(classes.cellCopyButton, 'copyButton') } onClick={e => this.onCopy(e) } data-copy={ info.val } title={ this.texts.copyState }/>
                <IconEdit className={ clsx(classes.cellEditButton, 'copyButton') } onClick={e => this.onEdit(id) }  title={ this.texts.editState }/>
            </div>
        </Tooltip>;
    }

    renderLeaf(item, isExpanded, widths, classes) {
        const id = item.data.id;
        isExpanded = isExpanded === undefined ? this.state.expanded.includes(id) : isExpanded;

        // icon
        let iconFolder;
        if (item.children) {
            iconFolder = isExpanded ? <IconOpen
                    className={ classes.cellIdIconFolder }
                    onClick={ () => this.toggleExpanded(id) }
                /> : <IconClosed
                    className={ classes.cellIdIconFolder }
                    onClick={ () => this.toggleExpanded(id) }
                />;
        } else {
            iconFolder = <IconDocument className={ classes.cellIdIconDocument } />;
        }
        let iconItem = null;
        if (item.data.icon) {
            if (typeof item.data.icon === 'string') {
                iconItem = <img className={ clsx(classes.cellIdIconOwn, 'iconOwn') } src={ item.data.icon } />;
            } else {
                iconItem = item.data.icon;
            }
        }


        const obj = item.data.obj;

        const typeImg = (obj && obj.type && ITEM_IMAGES[obj.type]) || <div className="itemIcon" />;

        const paddingLeft = ITEM_LEVEL * item.data.level;

        if (item.data.lang !== this.state.lang) {
            item.data.rooms = findRoomsForObject(this.info, id, this.state.lang).join(', ');
            item.data.funcs = findFunctionsForObject(this.info, id, this.state.lang).join(', ');
            item.data.lang = this.state.lang;
        }

        return <div
            className={ clsx(classes.tableRow, !item.data.visible && classes.filteredOut, this.state.selected && classes.itemSelected) }
            key={ id }
            id={ id }
            onDoubleClick={ () => this.toggleExpanded(id) }
        >
            <div className={ classes.cellId } style={{ width: widths.idWidth, paddingLeft }}>
                { iconFolder }
                <div className={ classes.cellIdSpan }>{ item.data.name }</div>
                { iconItem }
                <IconCopy className={ clsx(classes.cellCopyButton, 'copyButton') } onClick={e => this.onCopy(e) } data-copy={ id } />
            </div>
            {this.visibleCols.includes('name')    ? <div className={ classes.cellName } style={{ width: widths.widthName }}>{ item.data.title || '' }</div> : null }
            {this.visibleCols.includes('type')    ? <div className={ classes.cellType } style={{ width: widths.WIDTHS[0] }}>{ typeImg } { obj && obj.type }</div> : null }
            {this.visibleCols.includes('role')    ? <div className={ classes.cellRole } style={{ width: widths.WIDTHS[1] }}>{ obj && obj.common && obj.common.role }</div> : null }
            {this.visibleCols.includes('room')    ? <div className={ classes.cellRoom } style={{ width: widths.WIDTHS[2] }}>{ item.data.rooms }</div> : null }
            {this.visibleCols.includes('func')    ? <div className={ classes.cellFunc } style={{ width: widths.WIDTHS[3] }}>{ item.data.funcs }</div> : null }
            {this.visibleCols.includes('val')     ? <div className={ classes.cellValue } style={{ width: widths.WIDTHS[4] }}>{ this.renderColumnValue(id, item, classes) }</div> : null }
            {this.visibleCols.includes('buttons') ? <div className={ classes.cellButtons } style={{ width: widths.WIDTHS[5] }}>{ this.renderColumnButtons(id, item, classes) }</div> : null }
        </div>;
    }

    renderItem(root, isExpanded, widths, classes) {
        const items = [];

        root.data.id && items.push(this.renderLeaf(root, isExpanded, widths, classes));

        isExpanded = isExpanded === undefined ? binarySearch(this.state.expanded, root.data.id) : isExpanded;

        if (!root.data.id || isExpanded) {
            root.children && items.push(root.children.map(item =>
                (item.data.visible || item.data.hasVisibleChildren) && this.renderItem(item, undefined, widths, classes)));
        }

        return items;
    }

    renderHeader(widths) {
        const classes = this.props.classes;

        return <div className={ classes.headerRow } >
            <div className={ classes.headerCell } style={{ width: widths.idWidth }}>{ this.getFilterInput('id') }</div>
            {this.visibleCols.includes('name')    ? <div className={ classes.headerCell } style={{ width: widths.widthNameHeader }}>{ this.getFilterInput('name') }</div> : null }
            {this.visibleCols.includes('type')    ? <div className={ classes.headerCell } style={{ width: widths.WIDTHS[0] }}>{ this.getFilterSelectType() }</div> : null }
            {this.visibleCols.includes('role')    ? <div className={ classes.headerCell } style={{ width: widths.WIDTHS[1] }}>{ this.getFilterSelectRole() }</div> : null }
            {this.visibleCols.includes('room')    ? <div className={ classes.headerCell } style={{ width: widths.WIDTHS[2] }}>{ this.getFilterSelectRoom() }</div> : null }
            {this.visibleCols.includes('func')    ? <div className={ classes.headerCell } style={{ width: widths.WIDTHS[3] }}>{ this.getFilterSelectFunction() }</div> : null }
            {this.visibleCols.includes('val')     ? <div className={ clsx(classes.headerCell, classes.headerCellValue) } style={{ width: widths.WIDTHS[4] }}>{ this.props.t('Value') }</div> : null }
            {this.visibleCols.includes('buttons') ? <div className={ classes.headerCell } style={{ width: widths.WIDTHS[5] }}> { this.getFilterSelectCustoms() }</div> : null }
        </div>;
    }

    renderToast() {
        return <Snackbar open={ !!this.state.toast } autoHideDuration={ 3000 } onClick={ () => this.setState({ toast: '' }) } onClose={ () => this.setState({ toast: '' }) }>
            <Alert color="info" severity="success" >{ this.state.toast }</Alert>
        </Snackbar>;
    }

    componentDidUpdate() {
        if (this.tableRef.current) {
            const scrollBarWidth = this.tableRef.current.offsetWidth - this.tableRef.current.clientWidth;
            if (this.state.scrollBarWidth !== scrollBarWidth) {
                setTimeout(() => this.setState({ scrollBarWidth }), 100);
            }
        }
        if (!this.selectedFound) {
            if (this.props.selected && this.treeTableRef.current) {
                const node = findNode(this.root, this.props.selected);
                this.treeTableRef.current.scrollIntoView(node);
                this.selectedFound = true;
            }
        }
    }

    renderCustomDialog() {
        if (this.state.customDialog) {
            return <ObjectCustomDialog
                objectIDs={ this.state.customDialog }
                expertMode={ this.props.expertMode }
                t={ this.props.t }
                lang={ this.props.lang }
                socket={ this.props.socket }
                objects={ this.objects }
                customsInstances={ this.info.customs }
                onClose={ () => this.setState({ customDialog: null })}
            />;
        } else {
            return null;
        }
    }
    
    render() {
        this.recordStates = [];
        this.unsubscribeTimer && clearTimeout(this.unsubscribeTimer);

        // apply filter if changed
        const jsonFilter = JSON.stringify(this.state.filter);
        if (this.lastAppliedFilter !== jsonFilter && this.objects && this.root) {
            const counter = {count: 0};

            applyFilter(this.root, this.state.filter, this.state.lang, this.objects, null, counter);

            if (counter.count < 500 && !this.state.expandAllVisible) {
                setTimeout(() => this.setState({ expandAllVisible: true }));
            } else if (counter.count >= 500 && this.state.expandAllVisible) {
                setTimeout(() => this.setState({ expandAllVisible: false }));
            }

            this.lastAppliedFilter = jsonFilter;
        }

        this.unsubscribeTimer = setTimeout(() => {
            this.unsubscribeTimer = null;
            this.checkUnsubscribes();
        }, 200);

        if (!this.state.loaded) {
            return (<CircularProgress/>);
        } else {
           const idWidth = 300;
            const WIDTHS = [80, 120, 180, 180, 120, 76];

            const widths = {
                idWidth,
                WIDTHS,
                widthName: `calc(100% - ${idWidth + WIDTHS[0] + WIDTHS[1] + WIDTHS[2] + WIDTHS[3] + WIDTHS[4] + WIDTHS[5]}px)`,
                widthNameHeader: `calc(100% - ${idWidth + WIDTHS[0] + WIDTHS[1] + WIDTHS[2] + WIDTHS[3] + WIDTHS[4] +  WIDTHS[5] + this.state.scrollBarWidth}px)`,
            };

            const classes = this.props.classes;
            const items = this.renderItem(this.root, undefined, widths, classes);

            return (
            <Grid 
                container
                direction="column"
                className={classes.mainDiv} ref={ this.mainRef }
            >
                { this.getToolbar() }
                { this.renderHeader(widths) }
                <div className={ this.props.classes.tableDiv } ref={ this.tableRef }>
                    { items }
                </div>
                { this.renderToast() }
                { this.renderCustomDialog() }
            </Grid>);
        }
    }
}

ObjectBrowser.propTypes = {
    classes: PropTypes.object,
    defaultFilters: PropTypes.object,
    statesOnly: PropTypes.bool,
    selected: PropTypes.string,
    onSelect: PropTypes.func,
    onFilterChanged: PropTypes.func,
    socket: PropTypes.object,
    showExpertButton: PropTypes.bool,
    expertMode: PropTypes.bool,
    prefix: PropTypes.string,
    theme: PropTypes.string,
    t: PropTypes.func,
    lang: PropTypes.string,
};

export default withStyles(styles)(ObjectBrowser);

