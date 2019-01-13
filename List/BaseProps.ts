/**
 * @author Sean(sean.snow@live.com) createAt 18-3-12
 */
import { ReactElement, ReactType } from 'react';

export type ItemType = any;

export interface Props {
  data: Array<ItemType>
  useBodyScroll?: boolean
  onEndReached?: () => void
  onEndReachedThreshold?: number
  renderItem: (value: any, index: number, array: any[]) => ReactElement<any>,
  renderHeader?: () => ReactElement<any>
  renderFooter?: () => ReactElement<any>
  component?: ReactType<any>
}
