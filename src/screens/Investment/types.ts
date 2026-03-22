export type FundCard = {
  id: string;
  tag: string;
  title: string;
  yield: string;
  yieldLabel: string;
  min: string;
  category: string;
  bgColor: string;
};

export type ObjectiveItem = {
  id: string;
  icon: string;
  label: string;
  color: string;
};

export type TrendingFund = {
  id: string;
  title: string;
  badge: string;
  badgeColor: string;
  badgeText: string;
  meta: string;
  thumbBg: string;
  icon: string;
  iconColor: string;
};

export type BottomTabItem = {
  id: string;
  label: string;
  icon: string;
  activeIcon: string;
};
