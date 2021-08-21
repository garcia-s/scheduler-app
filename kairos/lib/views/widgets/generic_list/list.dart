import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

class GenericSearchableEditableList<T> extends StatefulWidget {
  const GenericSearchableEditableList({
    Key? key,
    required this.list,
    required this.render,
    required this.search,
    this.onAdd,
  }) : super(key: key);

  final List<T> list;
  final Widget Function(T e) render;
  final void Function()? onAdd;
  final bool Function(T, String s) search;

  @override
  _GenericListState<T> createState() => _GenericListState<T>();
}

class _GenericListState<T> extends State<GenericSearchableEditableList<T>> {
  String? _searchQuery;
  _GenericListState();

  @override
  Widget build(BuildContext context) {
    var _list = _searchQuery != null
        ? (widget.list).where((t) => widget.search(t, _searchQuery!)).toList()
        : widget.list;

    Size size = MediaQuery.of(context).size;
    return Scrollbar(
      isAlwaysShown: true,
      child: CustomScrollView(
        slivers: [
          SliverToBoxAdapter(
            child: SizedBox(
              height: size.height * 0.18,
              child: Center(
                child: SizedBox(
                  width: 300,
                  child: TextField(
                    autofocus: true,
                    onChanged: (txt) => setState(
                      () => _searchQuery = txt,
                    ),
                    decoration: const InputDecoration(
                      prefixIcon: Icon(Icons.search),
                    ),
                  ),
                ),
              ),
            ),
          ),
          SliverPadding(
            padding: const EdgeInsets.all(20),
            sliver: Builder(builder: (context) {
              return SliverFixedExtentList(
                itemExtent: 80,
                delegate: SliverChildListDelegate([
                  _Leading(onPressed: widget.onAdd),
                  ..._list
                      .map((e) => _ListItemWidget(
                            child: widget.render(e),
                          ))
                      .toList(),
                  _Trailing(),
                ]),
              );
            }),
          )
        ],
      ),
    );
  }
}

class _Trailing extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.background,
        borderRadius: const BorderRadius.vertical(
          bottom: Radius.circular(30),
        ),
      ),
    );
  }
}

class _Leading extends StatelessWidget {
  const _Leading({this.onPressed});
  final Function()? onPressed;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.background,
        borderRadius: const BorderRadius.vertical(
          top: Radius.circular(30),
        ),
      ),
      child: Center(
          child:
              onPressed != null ? _ListButton(onPressed!) : const Offstage()),
    );
  }
}

class _ListItemWidget extends StatelessWidget {
  final Widget child;
  const _ListItemWidget({required this.child});

  @override
  Widget build(BuildContext context) {
    final _colorScheme = Theme.of(context).colorScheme;
    return Container(
      decoration: BoxDecoration(
        color: _colorScheme.background,
        border: Border.all(color: _colorScheme.background, width: 6),
      ),
      child: Container(
        child: child,
        padding: const EdgeInsets.symmetric(horizontal: 20),
        decoration: BoxDecoration(
          color: _colorScheme.surface,
          borderRadius: const BorderRadius.all(
            Radius.circular(10),
          ),
        ),
        margin: const EdgeInsets.symmetric(
          horizontal: 15,
          vertical:0,
        ),
      ),
    );
  }
}

class _ListButton extends StatelessWidget {
  final Function() onPressed;
  const _ListButton(this.onPressed);

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    return Center(
        child: ElevatedButton(
      onPressed: onPressed,
      style: ButtonStyle(
        fixedSize: MaterialStateProperty.all(const Size(150, 40)),
        shape: MaterialStateProperty.all(
          const RoundedRectangleBorder(
            borderRadius: BorderRadius.all(Radius.circular(20)),
          ),
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Text('Agregar'),
          Icon(
            Icons.add,
            color: scheme.onPrimary,
          ),
        ],
      ),
    ));
  }
}
