import React, { useEffect, useState } from 'react'
import './_placeTree.css'
import * as Icon from 'react-bootstrap-icons';
import { Confirm, Loading, Popup, Toast, SessionTimeout } from '../../layout/layout'
import { Button, Input, Basic } from '../../../components/cute-ui/cuteUI';
import { Places } from '../../../controllers/controllers';
import { Place } from '../../../models/models';

enum visiblityType {
    visible = 'visible',
    invisible = 'invisible'
}

export type place = { id: number, title: string, childrens: Array<place> | Array<null> }

function PlaceNode({ data, viewType, onSelect = () => { }, onDelete = () => { } }: {
    data: Place, viewType: viewType, onSelect?: (e: Place) => {} | void, onDelete?: () => {} | void
}) {
    const deleteNode = (nodeId: number) => {
        Loading(true)
        Places.deletePlace(nodeId).then(() => {
            Toast('حذف با موفقیت انجام شد', Basic.type.success);
            onDelete()
        }).catch((e) => {
            Toast(e.error.Message, Basic.type.danger);
        }).finally(() => { Loading(false) });
    }
    const [visiblity, setVisiblity] = useState(visiblityType.invisible)
    return (
        <div className='place-node' onLoad={(e) => console.log(e.target)}>
            <div className='place'>
                <div className='place-collapes'>
                    {(data.childs.length > 0) ? (<Button style={{ padding: 0 }} onClick={() => {
                        if (visiblity == visiblityType.invisible) {
                            setVisiblity(visiblityType.visible)
                        } else {
                            setVisiblity(visiblityType.invisible)
                        }
                    }}>
                        {(visiblity == visiblityType.invisible) ? (
                            <Icon.CaretLeftFill size={15} />
                        ) : (
                                <Icon.CaretDownFill size={15} />
                            )}
                    </Button>) : null}
                </div>
                <div className='place-body'>{data.title}</div>
                {(viewType == "normal") ? (
                    <div className='place-options'>
                        {(data.type != 6 && data.path !== data.id.toString() && data.childs.length == 0) ? (
                            <Button theme={Basic.theme.outline} type={Basic.type.danger} style={{ padding: 0 }} onClick={() => {
                                Confirm('آیا مایل به حذف گره هستید؟', Basic.type.danger, () => {
                                    deleteNode(data.id)
                                })
                            }}>
                                <Icon.Trash size={15} />
                            </Button>
                        ) : null}
                        {(data.type != 6) ? (
                            <Button theme={Basic.theme.outline} type={Basic.type.primary} style={{ padding: 0 }} onClick={() => {
                                const [closer] = Popup('افزوردن گره جدید', <NewPlace parent={data.id} onSubmit={() => {
                                    closer()
                                }}></NewPlace>);
                            }}>
                                <Icon.Plus size={15} />
                            </Button>
                        ) : null}
                        <Button theme={Basic.theme.outline} type={Basic.type.secondary} style={{ padding: 0 }} onClick={() => { onSelect(data) }}>
                            <Icon.EyeFill size={15} />
                        </Button>
                    </div>
                ) : null}
                {(viewType == "selectable") ? (
                    <div className='place-options'>
                        <Button theme={Basic.theme.outline} type={Basic.type.secondary} size={Basic.size.xSmall} onClick={() => { onSelect(data) }}>
                            انتخاب
                        </Button>
                    </div>
                ) : null}
            </div>
            { visiblity == "visible" ? (
                <PlacesTree init={false} data={data.childs} type={viewType} onSelect={onSelect}></PlacesTree>
            ) : null}
        </div>
    )
}

function NewPlace({ onSubmit = () => { }, parent }: { onSubmit: () => {} | void, parent: number }) {
    const [title, setTitle] = useState('');
    return (
        <div>
            <Input title='عنوان گره' onChange={(e) => { setTitle(e) }}></Input>
            <Button disabled={title.length == 0} theme={Basic.theme.outline} type={Basic.type.primary} style={{ fontSize: 13, width: '100%', marginTop: 5 }}
                onClick={() => {
                    Loading(true)
                    Places.addPlace(parent, title).then(() => {
                        Toast('گره جدید با موفقیت ایجاد شد', Basic.type.success, Icon.Check); onSubmit();
                    }).catch((e) => {
                        Toast((e.status == 500) ? e.error.Message : 'خطا در ارتباط با سرور', Basic.type.danger);
                    }).finally(() => { Loading(false) });
                }}>ثبت</Button>
        </div>
    )
}

export enum viewType {
    normal = 'normal',
    readOnly = 'readOnly',
    selectable = 'selectable'
}

export function PlacesTree({
    init = true,
    data = [],
    visiblity = visiblityType.visible,
    type = viewType.normal,
    onSelect = () => { }
}: {
    init?: boolean,
    data?: Array<Place>,
    visiblity?: visiblityType,
    type?: viewType,
    onSelect?: (e: Place) => {} | void
}) {
    const [struct, setStruct] = useState(Array<Place>());
    useEffect(() => {
        if (init) {
            Loading(true)
            var promise = Places.getPlaces();
            promise.then(async (e: Array<Place>) => {
                setStruct([...e])
            })
            promise.catch((e) => {
                Toast(e.error.Message, Basic.type.danger)
            })
            promise.finally(() => {
                Loading(false)
            })
        }
        else {
            setStruct([...data])
        }
    }, [])
    return (
        (struct.length > 0) ? (
            <div className={`childrens ${visiblity}`}>
                {
                    (struct).map((value: Place, index: any) =>
                        <PlaceNode key={index} data={value} viewType={type} onSelect={onSelect} onDelete={() => {
                            var temp = struct;
                            temp.splice(index, 1);
                            setStruct([...temp]);
                        }} />
                    )
                }
            </div>
        ) : null
    )
}