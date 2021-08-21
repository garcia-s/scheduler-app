import 'package:flutter/material.dart';
import 'package:flutter/painting.dart';
import 'package:vortex/views/widgets/errors/form_error.dart';
import 'package:vortex/views/widgets/inputs/resizable_text_form_field.dart';
import 'package:vortex/views/widgets/loading.dart';

class ConfirmDeletionDialog extends StatefulWidget {
  final String type;
  final String confirmText;
  final Future<bool> Function() onSubmit;
  const ConfirmDeletionDialog({
    Key? key,
    required this.type,
    required this.confirmText,
    required this.onSubmit,
  }) : super(key: key);

  @override
  State<ConfirmDeletionDialog> createState() => _ConfirmDeletionDialogState();
}

class _ConfirmDeletionDialogState extends State<ConfirmDeletionDialog> {
  bool _loading = false;
  String? _error;
  final GlobalKey<FormState> _key = GlobalKey<FormState>();
  @override
  Widget build(BuildContext context) {
    if (_loading) return const ModalLoadingScreen();
    return Dialog(
      backgroundColor: Colors.transparent,
      child: Container(
        width: 400,
        height: 300,
        color: Colors.white,
        child: Form(
          key: _key,
          child: Column(
            children: [
              //SHOULD ADD A WARNING FLAG
              //Placeholder
              const Text('Warning'),
              Text.rich(
                TextSpan(
                  children: [
                    const TextSpan(
                        text:
                            'Esta a punto de eliminar una pieza de informacion imporante ('),
                    TextSpan(
                      text: widget.type,
                      style: const TextStyle(fontWeight: FontWeight.bold),
                    ),
                    const TextSpan(text: ') escriba el siguiente texto: '),
                    TextSpan(
                      text: widget.type + '/' + widget.confirmText,
                      style: const TextStyle(fontWeight: FontWeight.bold),
                    ),
                    const TextSpan(text: ' y haga click/tab en confirmar')
                  ],
                ),
              ),
              ResizableTextFormField(
                validator: (str) =>
                    str != widget.type + '/' + widget.confirmText
                        ? 'El texto introducido no es igual al requerido'
                        : null,
              ),

              FormError(error: _error),
              RawMaterialButton(
                onPressed: () async {
                  if (!_key.currentState!.validate()) return;
                  
                  setState(() => _loading = true);
                  if (await widget.onSubmit()) {
                    return Navigator.of(context).pop();
                  }
                  setState(() {
                    _loading = false;
                    _error =
                        'Ha ocurrido un error inesperado al intentar ejecutar esta accion, por favor intente mas tarde';
                  });
                },
                child: const Text('Eliminar'),
              ),
              RawMaterialButton(
                onPressed: () => Navigator.of(context).pop(),
                child: const Text('Cancelar'),
              )
            ],
          ),
        ),
      ),
    );
  }
}
