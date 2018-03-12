/**
 * @author Sean(sean.snow@live.com) createAt 18-3-12
 */
import { ReactElement } from 'react';

export type ItemType = any;

export interface Props {
  data: Array<ItemType>
  useBodyScroll?: boolean
  onEndReached?: () => void
  onEndReachedThreshold?: number
  renderItem: (info: { item: ItemType, index: number }) => ReactElement<any>,
  renderHeader?: () => ReactElement<any>
  renderFooter?: () => ReactElement<any>
}
